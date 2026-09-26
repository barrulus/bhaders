const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
(async () => {
  require('node:fs').mkdirSync('test-results', {recursive:true});
  const browser = await chromium.launch({...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}),headless:true,args:['--no-sandbox','--enable-webgl','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page = await browser.newPage({viewport:{width:1440,height:1080},reducedMotion:'reduce'});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto((process.env.BHADERS_TEST_URL || 'http://127.0.0.1:8088'),{waitUntil:'networkidle'});
  await page.locator('.card').first().waitFor();
  assert.equal(await page.locator('.card').count(),12);
  const compile = await page.evaluate(async()=>{
    const {ShaderPreview}=await import('./preview.js');
    const renderer=new ShaderPreview();
    const catalogue=await (await fetch('catalogue.json')).json();
    const results=[];
    for(const item of catalogue) for(const variant of item.variants) if(variant.preview) {
      try {const p=await renderer.prepare(variant.preview);renderer.draw(p,4.2);results.push({id:item.id,ok:true});}
      catch(e){results.push({id:item.id,ok:false,error:String(e)});}
    }
    return results;
  });
  console.log(JSON.stringify({shaderPreviews:compile.length,failures:compile.filter(r=>!r.ok)}));
  await page.screenshot({path:'test-results/desktop.png',fullPage:true});
  await page.getByRole('searchbox').fill('flowering');
  assert.equal(await page.locator('.card').count(),1);
  await page.getByRole('button',{name:'View Flowering Vine',exact:true}).click();
  await page.getByRole('dialog').waitFor();
  assert.match(await page.locator('#instructions').textContent(),/flowering-vine/);
  const download=page.waitForEvent('download'); await page.locator('#download').click();
  assert.match((await download).suggestedFilename(),/flowering-vine.*\.zip/);
  await page.locator('#variant').selectOption('1');
  assert.match(await page.locator('#instructions').textContent(),/\[appearance\]/);
  await page.screenshot({path:'test-results/detail.png'});
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#detail').evaluate(d=>d.open),false);
  await page.getByRole('searchbox').fill('zzzz-no-match');
  assert.equal(await page.locator('.card').count(),0);
  assert.equal(await page.locator('#empty').isVisible(),true);
  await page.getByRole('button',{name:'Clear filters'}).click();
  await page.getByRole('button',{name:'Cursor',exact:true}).click();
  await page.locator('#runtime').selectOption('umbriel');
  assert.equal(await page.locator('.card').count(),10);
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('.card').count(),10);
  await page.getByRole('button',{name:'Clear filters'}).click();
  await page.getByRole('button',{name:'Show more effects ↓'}).click();
  assert.equal(await page.locator('.card').count(),24);
  await page.setViewportSize({width:390,height:844});
  await page.goto((process.env.BHADERS_TEST_URL || 'http://127.0.0.1:8088'),{waitUntil:'networkidle'});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  await page.screenshot({path:'test-results/mobile.png',fullPage:true});
  assert.equal(await page.locator('#motion').textContent(),'Play motion');
  console.log(JSON.stringify({browserErrors:errors,ui:'search, filters, persistence, detail, download, keyboard, pagination, mobile, reduced motion passed'}));
  await browser.close();
  assert.deepEqual(errors,[]); assert.deepEqual(compile.filter(r=>!r.ok),[]);
})().catch(e=>{console.error(e);process.exit(1)});
