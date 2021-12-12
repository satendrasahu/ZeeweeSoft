import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Fab, Grid,TextField } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import { notify } from './Product';


function getModalStyle() {
  const top = 20 ;
  const left =  40;

  return {
    top: `${top}%`,
    left: `${left}%`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    maxWidth: 345,
    padding : 10,
    margin :0,
    textAlign : "center"
  },
  media: {
    height: 140,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

  const UpdateModel =({id,title, price, size, discount, image }) => {
  
//   alert(image)
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [productDetails, setProductDetails] = React.useState({
      id : id,
      Title : title,
      price : price,
      size :  size,
      discount : discount,
      image : image
  })
// console.log("iiiiii",productDetails.image)
  const inputEvent = (event) =>{
      console.log(event.target.value);
      console.log(event.target.name);
      const {name, value} = event.target;
      setProductDetails((preValue)=>{
          console.log(preValue);
          return {
              ...preValue,
              [name] : value
          }
      })
  }


  useEffect(() => {

    if (url) {
        
        const { id, Title,price ,size ,discount}  = productDetails
        const data =fetch(`api/product/${id}`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              title: Title , price, size, discount, image :url,  discountedPrice: price * (1 - (discount / 100))
            })
        })

              if(data)
              {notify("New cart product has saved")
                console.log(data, " form cart post data")
                // history.push('/product')
                setOpen(false);
                window.location.reload(); 
              }
             else  if(data.status === 422){
                window.alert("invalid cart data")
              }
    }
}, [url,productDetails])

  

  const PostData =async(e) =>{
      e.preventDefault();
    //   alert(image)
    // console.log("image urlllllllll",image,"hhhhhh")
    const formdata = await new FormData()
    formdata.append("file",img)
    formdata.append("upload_preset","bestpeers") 
    formdata.append('cloud_name', 'sahu-s-theclassic')
    await fetch('https://api.cloudinary.com/v1_1/sahu-s-theclassic/image/upload', {
        method: 'post',
        body: formdata
    })
    .then(response => response.json())
    .then(data => {
        setUrl(data.url);
        console.log(data)
    })
    .catch(error => {
        console.error('Error:', error);
    });
            
    
    const { id, Title,price ,size ,discount}  = productDetails
            if(!url){
                const res = await fetch(`api/product/${id}`,{
                    method : "PATCH",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                      title: Title , price, size, discount,  discountedPrice: price * (1 - (discount / 100))
                    })
                })

                const data = await res.json();

                if(data)
                {notify("New cart product has saved")
                  console.log(data, " form cart data")
                  // history.push('/product')
                  setOpen(false);
                  window.location.reload(); 
                }
               else  if(data.status === 422){
                  window.alert("invalid cart data")
                }

            }


              }



              const handleOpen = () => {
                setOpen(true);
              };

              const handleClose = () => {
                setOpen(false);
              };



              const useWindowSize = ()=>
              {
                const [size, setSize] = React.useState([window.innerHeight,window.innerWidth])
                useEffect(()=>{
                  const handelResize = () => {
                    setSize([window.innerHeight,window.innerWidth]);
                        }
                        window.addEventListener("resize",handelResize);
                        return()=>{
                          window.removeEventListener("resize",handelResize)
                        }
                },[])
                return size
              }
              const [ width] = useWindowSize();

  return (
    <div>
      
      {/* <Button variant="contained" color="primary"  style={{margin : '5px'}} onClick ={handleOpen}> <EditIcon /> </Button> */}
      <Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick ={handleOpen}>
     <EditIcon /> 
      
    </Fab>
   
   {width > 650? 
   <Modal
   open={open}
   onClose={handleClose}
   aria-labelledby="simple-modal-title"
   aria-describedby="simple-modal-description"
 >
    <div style={modalStyle} className={classes.paper}>
       <div style={{textAlign:"center"}}>

       <h2>Update Product</h2>
       </div>
       <Grid item sm>
        <Card className={classes.root}>
   
   <form method="POST" encType="multipart/form-data">


   
   <TextField  
  type = "text"
   label="Title"
   name= "Title" 
   value = {productDetails.Title}
   onChange={inputEvent}
   autoComplete='off'
   required
   style={{margin : 15}}
   />  
    
    <TextField  
   type="number" 
   label="Price"
   name= "price" 
   inputProps={{ min: 0 }}
   value = {productDetails.price}
   onChange={inputEvent}
   autoComplete='off'
   required
   style={{margin : 15}}
   />
    <TextField  
   type="number" 
   label="Discount"
   name= "discount" 
   inputProps={{ min: 0 }}
   value = {productDetails.discount}
   onChange={inputEvent}
   autoComplete='off'
   required
   style={{margin : 15}}
   />
    <TextField  
   type="number" 
   label="Size"
   name= "size" 
   inputProps={{ min: 0 }}
   value = {productDetails.size}
   onChange={inputEvent}
   autoComplete='off'
   required
   style={{margin : 15}}
   />
     <TextField  
       type="file" 
       label="file"
       name= "image" 
         onChange={(e) => setImg(e.target.files[0])}
         autoComplete='off'
         style={{margin : 15}}
     />
         <Button size="small" type = "submit" variant="contained" color="primary" name ="submit" style={{margin : 15}}
     onClick ={PostData}
     >
     Create
   </Button>
   <Button size="small" variant="contained" color="secondary"
   onClick={()=>setOpen(false)}
   >
     Cancel
   </Button>
   </form>
</Card>
</Grid>
</div>
 </Modal>

   :
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         <div className={classes.paper}>
            <div style={{textAlign:"center"}}>

            <h2>Update Product</h2>
            </div>
            <Grid item sm>
             <Card className={classes.root}>
        
        <form method="POST" encType="multipart/form-data">


        
        <TextField  
       type = "text"
        label="Title"
        name= "Title" 
        value = {productDetails.Title}
        onChange={inputEvent}
        autoComplete='off'
        required
        style={{margin : 15}}
        />  
         
         <TextField  
        type="number" 
        label="Price"
        name= "price" 
        inputProps={{ min: 0 }}
        value = {productDetails.price}
        onChange={inputEvent}
        autoComplete='off'
        required
        style={{margin : 15}}
        />
         <TextField  
        type="number" 
        label="Discount"
        name= "discount" 
        inputProps={{ min: 0 }}
        value = {productDetails.discount}
        onChange={inputEvent}
        autoComplete='off'
        required
        style={{margin : 15}}
        />
         <TextField  
        type="number" 
        label="Size"
        name= "size" 
        inputProps={{ min: 0 }}
        value = {productDetails.size}
        onChange={inputEvent}
        autoComplete='off'
        required
        style={{margin : 15}}
        />
          <TextField  
            type="file" 
            label="file"
            name= "image" 
              onChange={(e) => setImg(e.target.files[0])}
              autoComplete='off'
              style={{margin : 15}}
          />
              <Button size="small" type = "submit" variant="contained" color="primary" name ="submit" style={{margin : 15}}
          onClick ={PostData}
          >
          Create
        </Button>
        <Button size="small" variant="contained" color="secondary"
        onClick={()=>setOpen(false)}
        >
          Cancel
        </Button>
        </form>
    </Card>
</Grid>
    </div>
      </Modal>
  
   }
   
   
    </div>
  );
}


export default UpdateModel