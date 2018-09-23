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
