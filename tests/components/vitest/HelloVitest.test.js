import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloVitest from '../../components/vitest/HelloVitest.vue'; 

// mount: Monta o componente para teste e cria uma instância dele.
// describe: Agrupa testes relacionados em um bloco descritivo.
// it: Define um teste específico e o que ele deve verificar.
// expect: Verifica se um valor é o esperado.


describe('HelloVitest', () => {
  it('renderização do texto', () => {
    const wrapper = mount(HelloVitest);
    expect(wrapper.text()).toContain('Hello, World!');
  });

  it('Verificando as classes corretas', () => {
    const wrapper = mount(HelloVitest);
    expect(wrapper.classes()).toContain('bg-orange-400');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('justify-center');
    expect(wrapper.classes()).toContain('items-center');
    expect(wrapper.classes()).toContain('font-bold');
    expect(wrapper.classes()).toContain('animate-pulse');
    expect(wrapper.classes()).toContain('w-full');
    expect(wrapper.classes()).toContain('h-screen');
  });
});
