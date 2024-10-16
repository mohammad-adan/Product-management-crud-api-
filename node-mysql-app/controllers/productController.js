// get all product list

const db = require("../config/database");

const getProduct = async (req,res) => {
    try{
        const data = await db.query('SELECT * FROM products')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            message:'All Students Records',
            data : data[0],
        })
    }catch (error){
        console.log(error)
        res.status(500).send({
            succcess:false,
            message:"Error in Get ALL Product API",
            error
        })
    }
};

// GET product by id
const getProductByID = async(req,res) => {
    try{
        const productId = req.params.id
        if(!productId){
            return res.status(404).send({
                success:false,
                message:'Invalid  product id'
        })

    }
    const data  = await db.query('SELECT * FROM products WHERE id=?', [productId])
    if(!data){
        return res.status(404).send({
            success:false,
            message:'No Records found'
        })
    }
    res.status(200).send({
        success:true,
        productDetails : data[0],
    })
    } catch (error){
        console.log(error)
        res.status(500).send({
            succcess:false,
            message:"Error in Get product by id API",
            error
        })
    }

};

//create product
const createProduct =async(req,res)=> {
    try{
        const {name} = req.body
        if(!name){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const data = await db.query(
            'INSERT INTO products (name) VALUES(?)',[name])
        if(!data){
            return res.status(404).send({
                success: false,
                message:"ERROR in INSERT QUERY",
            });
        }
        res.status(201).send({
            success: true,
            message: 'New Product Record Created',
        })
    }catch (error){
  console.log(error)
  res.status(500).send({
      succcess:false,
      message:"Error in create product  API",
      error
  })

}
};
//update
const updateProduct = async(req,res) =>{
    try{
        const productId = req.params.id;
        if(!productId){
            return res.status(404).send({
            success:false,
            message:'Invalid  product id'
        });
    }
    const {name} = req.body;

    const data = await db.query('UPDATE products SET name = ? WHERE id=?',[name]);
    if(!data){
        return res.status(500).send({
            success: false,
            message:"ERROR in UPDATE QUERY",
        });
    }
    res.status(200).send({
        success: true,
        message: " Product details updated",
    });

    }catch(error){
        console.log(error);
        res.status(500).send({
        success:false,
        message:"Error in update product  API",
        error,
})
    }
}; 

//delete
const deleteProduct =async(req,res)=>{
try{
    const productId = req.params.id
    if(!productId){
         return res.status(404).send({
            success: false,
            message: 'provide product id'
        });
    }
    await db.query('DELETE FROM products WHERE id=?',[productId])
    res.status(204).send({
         success: true,
         message: " Product delete completely"
    });
}catch(error){
    console.error(error);
res.status(500).send({
    success: false,
    message: 'Error in update product API',
    error
})
}


};
module.exports = { getProduct, getProductByID, createProduct , updateProduct ,deleteProduct};