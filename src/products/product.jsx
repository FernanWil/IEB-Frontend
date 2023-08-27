import React, { useState, useEffect, Fragment } from 'react'
import { ConsultInfo, ConsultarModal } from '../components/forms'
import { get, } from '../components/api/products'
const Product = () => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const dataProduct = await get("product-detail")
                setProduct(dataProduct)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <Fragment>
            <div className='card m-4 border-dark'>
                <div className='card-body '>
                    <div className='card-title text-white bg-dark'>
                        <h3 className='p-2 pb-2 text-center'>Listado de los Productos</h3>
                    </div>
                    <table className="table table-bordered table-hover table-active ">
                        <thead className="bg-info text-white">
                            <tr>
                                <th>Id</th>
                                <th>Producto</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Botón</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                            product.map((i) => (
                            <tr key={i.products.idProduct}>
                                <td>{i.products.idProduct}</td>
                                <td>{i.products.nameProduct}</td>
                                <td>{i.products.description}</td>
                                <td>{i.products.price}</td>
                                <td>{i.amount}</td>
                                <td>
                                    <ConsultarModal
                                    name={{ btnOpen: "Ver más", title: `${i.products.nameProduct}` }} children={<ConsultInfo id={i} />} identify={i.products.idProduct}
                                    />
                                </td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Product
