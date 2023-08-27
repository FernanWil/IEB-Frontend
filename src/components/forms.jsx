import React, { useState, useEffect, Fragment } from 'react'
import { create, get } from './api/products';

const FormProduct = () => {
  const [formData, setFormData] = useState({
    nameProduct: "",
    description: "",
    price: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await create("products", formData)
      console.log("data", data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <div className='card m-4 col-md-10 mx-auto border-dark' style={{ width: "100%" }}>
        <div className='card-body'>
          <div className='card-title bg-dark text-white'>
            <h3 className='p-2 pb-2 text-center'>Registrar Productos</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='justify-content-between col'>
              <div className='row'>
                <div className="form-group col-4">
                  <label htmlFor="nameProduct">Producto:</label>
                  <input value={formData.nameProduct} onChange={handleChange} name="nameProduct" type="text" className="form-control" id="nameProduct" />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="price">Precio:</label>
                  <input value={formData.price} onChange={handleChange} name="price" type="text" className="form-control" id="price" />
                </div>
                <div className="form-group col-4">
                  <label htmlFor="description">Descripción:</label>
                  <input value={formData.description} onChange={handleChange} name="description" type="text" className="form-control" id="description" />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-info">Registrar</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}



const FormDetails = () => {
  const [getDetails, setGetDetails] = useState([])
  const [getDetailId, setGetDetailId] = useState([])
  const [getProduct, setGetProduct] = useState([])
  const [formData, setFormData] = useState({
    products: "",
    amount: "",
  })

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const getDataDetails = async () => {
      try {
        const dataId = await get(`product-detail`)
        setGetDetailId(dataId)

        const dataP = await get("products")
        setGetProduct(dataP)

        const data = await get("product-detail")
        setGetDetails(data)
      } catch (error) {
        console.log(error)
      }
    }
    getDataDetails()
  }, [])


  const calculation = (cant, value) => {
    const vatValue = (value * 0.19) * cant
    const fullValue = value * cant

    return {
      amount: cant,
      fullValue: fullValue,
      vatValue: vatValue
    }
  }
  const handleSubmit = async () => {
    const selectedProduct = getProduct.find(product => product.idProduct === parseInt(formData.products));
    const calculatedData = calculation(parseInt(formData.amount), selectedProduct.price);

    const dataToSubmit = {
      products: formData.products,
      amount: calculatedData.amount,
      fullValue: calculatedData.fullValue,
      vatValue: calculatedData.vatValue
    };

    try {
      // const dataId = await create(`product-detail`)
      const data = await create("product-detail", dataToSubmit)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Fragment>
      <div className='card m-4 col-md-10 mx-auto  border-dark' style={{ width: "100%" }}>
        <div className='card-body'>
          <div className='card-title bg-dark text-white'>
            <h3 className='p-2 pb-2 text-center'>Registrar Detalles</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='justify-content-between col'>
              <div className='row'>
                <div className="form-group col-6">
                  <label htmlFor="products" >Productos: </label>
                  <select className="form-select form-select mb-3" value={formData.products} onChange={handleChange} name='products' id='products'>
                    <option>Selecionar</option>
                    {getProduct.map((i) => {
                      return (
                        <option key={i.idProduct} value={i.idProduct}>{i.nameProduct}</option>
                      )
                    })
                    }
                  </select>
                </div>
                <div className="form-group col-6">
                  <label htmlFor="amount">Cantidad:</label>
                  <input value={formData.amount} onChange={handleChange} name="amount" type="text" className="form-control" id="amount" />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-info">Registrar</button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

const ConsultInfo = ({ id }) => {
  const [info, setInfo] = useState(id)
  const [formData, setFormData] = useState({
    nameProduct: info.products.nameProduct,
    fullValue: info.fullValue,
    vatValue: info.vatValue
  })
  console.log("info: ",info)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Fragment>
      <form>
        <div className='col'>
          <div className='row justify-content-between'>
            <div className="form-group col-4">
              <label  className='font-weight-bold'>Producto:</label>
              <p className="font-bold" value={formData.nameProduct} onChange={handleChange}>{formData.nameProduct}</p>

            </div>
            <div className="form-group col-4">
              <label  className='font-weight-bold'>Valor Total:</label>
              <p className="font-bold" value={formData.fullValue} onChange={handleChange}>{formData.fullValue}</p>
            </div>
            <div className="form-group col-4">
              <label className='font-weight-bold'>Valor Iva:</label>
              <p className="font-bold" value={formData.vatValue} onChange={handleChange}>{formData.vatValue}</p>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  )
}

const ConsultarModal = ({ children, name, identify, styles }) => {

  return (
    <div>
      <button type="button" className="btn btn-info bg-info" data-toggle="modal" data-target={`#consult${identify}`}>
        {name.btnOpen}
      </button>
      <div className="modal" id={`consult${identify}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={styles}>
            <div className="modal-header">
              <h4 className="modal-title text-2xl">{name.btnOpen} {name.title}</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { FormDetails, FormProduct, ConsultInfo, ConsultarModal }

