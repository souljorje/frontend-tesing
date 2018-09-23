import NuxtSelector from 'testcafe-nuxt-selectors';

require('dotenv').config();

fixture`Getting Started`
  .page(`${process.env.BASE_URL}/`)
  .beforeEach(async () => await NuxtSelector());

test('nuxt uses correct layout', async (cafe) => {
  const nuxt = NuxtSelector();
  const vm = await nuxt.getVue();
  await cafe
    .expect(nuxt.exists).ok()
    .expect(vm.state.layoutName).eql('default');
});

test('Counter value is right', async (cafe) => {
  const counterValue = NuxtSelector('counter').find('.value').innerText;
  await cafe.expect(counterValue).eql('0');
});

test('Router works', async (cafe) => {
  const routerLink = NuxtSelector('router-link');
  await cafe.click(routerLink);
  const location = await cafe.eval(() => window.location);
  await cafe.expect(location.pathname).eql('/test');
});
