
const get = async (access) => {
    try {
       const response = await fetch(`http://localhost:3000/${access}`, {
          method: "GET",
       })
       const data = await response.json();
       return data
    } catch (error) {
       console.error(error)
       throw error;
    }
 }


 const create = async (access, body) => {
    try {
        //http://localhost:3000/products
       const response = await fetch(`http://localhost:3000/${access}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body)
       })
       const data = await response.json()
       return data
    } catch (error) {
       throw error
    }
 }

export {
    get,
    create
}