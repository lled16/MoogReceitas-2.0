import Header from '../Header/Header'
import { useState, useEffect } from "react"
import Cards from '../card/Cards'
import styles from '../card/cards.module.css'

export default function ReceitasDoces() {



    const [itensPerPage, setItensPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [receitas, setReceitas] = useState([]);
    const pages = Math.ceil(receitas.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = receitas.slice(startIndex, endIndex);



    useEffect(() => {
        setTimeout(
            () => {
                fetch('https://localhost:7136/CadastrandoReceita/getReceitasTotal?codCategoria=' + 2, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json'
                    },
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        setReceitas(data)

                    })
                    .catch((err) => console.log(err))
            }, 300)


    }, [])




    return (
        <>
            <Header
                naoExibePesquisa={false}
            />



            <div className={styles.titulo}>
                <h1> Receitas Salgadas </h1>
            </div>




            <div className={styles.space}>

                {receitas.length > 0 &&
                    currentItens.map((receita) => (
                        <Cards

                        id={receita.id}
                        name={receita.nome}
                        tmp_preparo={receita.tmp_preparo}
                        categoria = {receita.categoria} 
                        ingredientes = {receita.ingredientes}
                        modo_preparo = {receita.modo_preparo}
                        porcoes = {receita.porcoes}
                        img={receita.img}
                        />
                    ))}
            </div>

            <div  className={styles.divPag} >

                {Array.from(Array(pages), (item, index) => {
                    return <div  className={styles.button} ><button value={index} className={styles.buttonPag} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button></div>
                })}
            </div>
        </>
    )
}