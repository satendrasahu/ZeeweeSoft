import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid,TextField } from '@material-ui/core';

import Card from '@material-ui/core/Card';
import { notify } from './Product';
import swal from 'sweetalert';

export default function SimpleModal() {
  
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState("");
  const [url, setUrl] = React.useState("");


  
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
}));


const classes = useStyles();

  const [productDetails, setProductDetails] = React.useState({
      Title : "",
      category : "",
      price : "",
      size :  "",
      discount : "",
      image : "",
  })

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

      
      const { Title,category, price ,size ,discount}  = productDetails
      // alert(Title)

      if( Title ==="")
      {
        swal("please filled require data")
          return
      }
              const data = fetch('api/product',{
                  method : "POST",
                  headers : {
                      "Content-Type" : "application/json"
                  },
                  body : JSON.stringify({
                    title: Title ,category, price, size, discount, image :url 
                  })
              })

              // const data = res.json();
              if(data)
              {notify("New product has saved")
                console.log(data, " form post data")
                // history.push('/product')
                setOpen(false);
                window.location.reload(); 
              }
             else  if(data.status === 422){
                window.alert("invalid data")
              }
    }
}, [url,productDetails])

  const PostData =async(e) =>{
      e.preventDefault();

      if( img ==="")
      {
        swal("please filled require data")
        return
      }
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
}
      const handleOpen = () => {
          setOpen(true);
      };

      const handleClose = () => {
          setOpen(false);
      };
      
      const [width] = useWindowSize();
      // const [height, width] = useWindowSize();
  return (
    <div>
      
      <Button variant="contained" color="primary"  style={{margin : '5px'}} onClick ={handleOpen}> Add new Product </Button>
  

   {width > 650 ?<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
         <div 
         style={modalStyle} 
         className={classes.paper}>
            <div style={{textAlign:"center"}}>

            <h2>Create Product</h2>
            </div>
            <Grid item sm={12}>
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
        type="string" 
        label="category"
        name= "category" 
        inputProps={{ min: 0 }}
        value = {productDetails.category}
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
        label="Quantity"
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
   
    : <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
     <div 
    //  style={modalStyle} 
     className={classes.paper}>
        <div style={{textAlign:"center"}}>

        <h2>Create Product</h2>
        </div>
        <Grid item sm={12}>
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
    required = {true}
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
