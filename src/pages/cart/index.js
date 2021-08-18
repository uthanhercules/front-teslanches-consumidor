/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import '../../styles/global.css';
import './styles.css';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import useStyles from './styles';
import { postEstadoProduto, put } from '../../services/apiClient';
import precoConvertido from '../../formatting/currency';

import carrinho from '../../assets/carrinho.svg';

export default function Cart({
  id: idProduto,
  nome,
  descricao,
  preco,
  recarregarPag,
  imagem_produto: temImagem,
  valor_minimo_pedido: valorMinimo,
  tempo_entrega_minutos: tempoMinutos,
  taxa_entrega: taxaEntrega
}) {
  const [erro, setErro] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [addCarrinho, setAddCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState([]);
  const [open, setOpen] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const classes = useStyles();
  const customId = 'custom-id-yes';
  const {
    register, handleSubmit, formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: '',
    defaultValues: {},
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function stop(e) {
    e.stopPropagation();
  }

  async function onSubmit(data) {
    setCarregando(true);
    setErro('');

    // const { ...dadosAtualizados } = Object
    //   .fromEntries(Object
    //     .entries(data)
    //     .filter(([, value]) => value));
    console.log(data);
    try {
      // const { dados, ok } = await put(`/produtos/${idProduto}`, dadosAtualizados, token);
      // if (!ok) {
      //   setErro(dados);
      //   toast.error(dados);
      //   return;
      // }

      // if (ativou) {
      //   await postEstadoProduto(`/produtos/${idProduto}/ativar`, token);
      //   toast.warn('O produto foi ativado!');
      // } else {
      //   await postEstadoProduto(`/produtos/${idProduto}/desativar`, token);
      //   toast.warn('O produto foi desativado');
      // }

      setCarregando(false);
    } catch (error) {
      toast.error(error.message);
      setErro(error.message);
    }

    // handleClose();
    // recarregarPag();
    toast.success('O pedido foi atualizado com sucesso!');
  }

  const produtos = [
    {
      nome: 'pizza de bambu',
      unidades: '',
      preco: 4300
    },
    {
      nome: 'omelete de gatos',
      unidades: '',
      preco: 3900
    },
  ];

  const endereco = '';

  return (
    <div onClick={(e) => stop(e)} className={classes.container}>
      <button
        id="btCart"
        type="button"
        className="btLaranja mt2rem"
        onClick={handleClickOpen}
      >
        Carrinho
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className="flexColumn">
          <div className="bodyCart flexColumn">
            <div className="topCart flexRow posRelative gap2rem ">
              <img id="iconCart" src={carrinho} alt="foto carrinho" />
              <h1>Nome do restaurante</h1>
              <button id="btCrossCart" className="btCross" type="button" onClick={handleClose}>
                &times;
              </button>
            </div>
            <div className={`${endereco ? 'conteinerEndereco' : 'none'} px3rem mb2rem`}>
              <span>
                {endereco}
              </span>
            </div>
            <div className={`${endereco ? 'none' : 'conteinerFaltaEndereco'} px2rem flexRow itemsCenter ml3rem mb2rem`}>
              <button className="btTransparente" type="button">Adicionar Endereço</button>
            </div>
            <h4>
              Tempo de Entrega:
              { tempoMinutos }
            </h4>
            {/* TODO - display none */}
            <div className="none produtoNoCarrinho flexColumn contentCenter itemsCenter">
              <p>Pedido adicionado!</p>
            </div>
            {/* TODO - display none */}
            <div className=" conteinerDetalhesProduto px3rem">

              <div className="cardsProdutos flexRow mt2rem contentCenter px2rem">
                { produtos.map((produto) => (
                  <div className="cardCart">
                    <card
                      {...produto}
                      unidades={quantidade}
                      verificaAtivo="tem que por"
                    />
                  </div>
                ))}
              </div>
              <div className="flexRow mt3rem contentCenter px2rem mb3rem">

                <button id="btTransparenteCinza" type="submit">Ir para a revisão do pedido</button>
              </div>
              <div className="lineSpace" />
              <form>
                <div className="flexColumn contentCenter px2rem">
                  <div className="subTotal flexRow contentBetween mb06rem">
                    <span>Subtotal</span>
                    <span>{precoConvertido(subtotal)}</span>
                  </div>
                  <div className="taxaEntrega flexRow contentBetween mb1rem">
                    <span>Taxa de entrega</span>
                    <span>{precoConvertido(taxaEntrega)}</span>
                  </div>
                  <div className="total flexRow contentBetween mb06rem">
                    <span>Total</span>
                    <h2>{precoConvertido(subtotal + taxaEntrega)}</h2>
                  </div>
                  <div className="flexRow contentCenter itemsCenter">
                    <button id="btConfirmaPedido" className="btLaranja" type="submit" onClick={handleSubmit(onSubmit)}>
                      Confirmar pedido
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flexRow contentCenter mt1rem" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}