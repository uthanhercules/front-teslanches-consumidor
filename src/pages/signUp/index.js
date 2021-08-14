/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './styles.css';
import '../../styles/global.css';
import { React, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { postNaoAutenticado } from '../../services/apiClient';
import { schemaCadastro } from '../../validation/schema';
import imageCenter from '../../assets/img-center-register.svg';
import imageLogo from '../../assets/logo-register.svg';
import InputPassword from '../../components/inputPassword';

export default function SingUp() {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const history = useHistory();
  const toastOk = 'ok';
  const toastErro = 'erro';
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCadastro)
  });

  async function onSubmit(data) {
    console.log(data);
    const { senhaConfere, ...dadosAtualizados } = Object
      .fromEntries(Object
        .entries(data)
        .filter(([, value]) => value));
    if (password !== passwordCheck) {
      return toast.error('As senhas precisam ser iguais');
    }

    try {
      const { dados, ok } = await postNaoAutenticado('/cadastro', dadosAtualizados);
      if (!ok) {
        toast.error(dados, { toastId: toastErro });
        return;
      }
      history.push('/');
      return toast.success('Cadastro realizado com sucesso', { toastId: toastOk });
    } catch (error) {
      return toast.error(error.message, { toastId: toastErro });
    }
  }

  toast.error(errors.nome_usuario?.message, { toastId: toastErro });
  toast.error(errors.telefone?.message, { toastId: toastErro });
  toast.error(errors.email?.message, { toastId: toastErro });
  toast.error(errors.senha?.message, { toastId: toastErro });
  toast.error(errors.senhaConfere?.message, { toastId: toastErro });

  return (
    <article className="telaRegistro">
      <img id="logoRegister" src={imageLogo} alt="imagem logo do restaurante" />
      <img id="centroRegister" src={imageCenter} alt="imagem garota olhando celular" />
      <section className="telaRegistroFormulario">
        <main>
          <form autoComplete={false} onSubmit={handleSubmit(onSubmit)}>
            <h1 className="mb1rem">Novo usuario</h1>
            <div className="flexColunm mb1rem ">
              <label htmlFor="nome">Nome</label>
              <input id="nome_usuario" type="text" {...register('nome_usuario', { required: true })} />
            </div>
            <div className="flexColunm mb1rem ">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" {...register('email', { required: true })} />
            </div>
            <div className="flexColunm mb1rem ">
              <label htmlFor="telefone">Telefone</label>
              <input id="telefone" type="number" placeholder="DDD 12345 1234" {...register('telefone', { required: true, minLength: 11 })} />
            </div>
            <InputPassword
              id="senha"
              label="Senha"
              register={() => register('senha', { required: true, minLength: 8 })}
              value={password}
              setValue={setPassword}
            />
            <InputPassword
              id="senhaConfere"
              label="Repita a senha"
              register={() => register('senhaConfere', { required: true, minLength: 8 })}
              value={passwordCheck}
              setValue={setPasswordCheck}
            />
          </form>
        </main>
        <footer>
          <button className="btLaranja" type="submit" onClick={handleSubmit(onSubmit)}>Criar conta</button>
          <p className="retornarLogin">
            Já tem uma conta?
            <Link to="/">  Fazer login</Link>
          </p>
        </footer>
      </section>
    </article>
  );
}
