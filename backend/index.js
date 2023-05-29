const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const TokenManager = require("./token_manager");

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(require("express").json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


//MySQL Connecttion
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root219',
  database:'shopify',
  port:'3307'

})

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL');
    return;
  }
  console.log('Connected to MySQL');
});

app.post("/signupSeller",async(req,res) => {
  const { fname ,lname ,email,password} = req.body;
  
  try{connection.query(
    "INSERT INTO owners(owner_firstname ,owner_lastname,owner_email,owner_password) VALUES(?, ?, ? , ?)",
      [fname ,lname ,email,password],
      (err,results,fields) =>{
        if(err){
          console.log("Error insert",err);
          return res.status(400).send();
        }
        return res.status(201).json({message: "New seller successfully"});
      }
    )
  }catch(err) {
   console.log(err);
    return res.status(500).send();
  }

})
  
app.post("/signup",async(req,res) => {
  const { fname ,lname ,email,password,gen,phone,dob} = req.body;
  
  try{connection.query(
    "INSERT INTO customers(customer_firstname ,customer_lastname,customer_email,customer_password,customer_gender,customer_tel_no,customer_bod) VALUES(?, ?, ?, ?, ?, ?, ?)",
      [fname ,lname ,email,password,gen,phone,dob],
      (err,results,fields) =>{
        if(err){
          console.log("Error insert",err);
          return res.status(400).send();
        }
        return res.status(201).json({message: "New customer successfully"});
      }
    )
  }catch(err) {
   console.log(err);
    return res.status(500).send();
  }

})
  
app.get("/registerSeller/read", async (req, res) => {
  try {
      connection.query("SELECT * FROM owners", (err, results, fields) => {
          if (err) {
              console.log(err);
              return res.status(400).send();
          }
          res.status(200).json(results)
      })
  } catch(err) {
      console.log(err);
      return res.status(500).send();
  }
})

app.post('/loginSeller', (req, res) => {
  const { email, password } = req.body;

  // query database for customer with matching email and password
  const sql = 'SELECT * FROM owners WHERE owner_email = ? AND owner_password = ?';
  connection.query(sql, [email, password], (err, results, fields) => {
    if (err) {
      console.log('Error querying database:', err);
      return res.status(500).send();
    }

    // check if customer exists in database
    if (results.length === 0) {
      console.log('Incorrect email or password');
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    let accessToken = TokenManager.getGenerateAccessToken({"id": results[0].owner_id});
    return res.send(JSON.stringify({ status: "1", "access_token": accessToken }));
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // query database for customer with matching email and password
  const sql = 'SELECT * FROM customers WHERE customer_email = ? AND customer_password = ?';
  connection.query(sql, [email, password], (err, results, fields) => {
    if (err) {
      console.log('Error querying database:', err);
      return res.status(500).send();
    }

    // check if customer exists in database
    if (results.length === 0) {
      console.log('Incorrect email or password');
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    let accessToken = TokenManager.getGenerateAccessToken({"id": results[0].customer_id});
    return res.send(JSON.stringify({ status: "1", "access_token": accessToken }));
  });
});

app.post("/get_user_customer",(req,res)=>{
  let jwtStatus = TokenManager.checkAuthentication(req);
  if(jwtStatus!=false){
      const sql = 'SELECT * FROM customers WHERE customer_id = ?';
      connection.query(sql, [jwtStatus.id], (err, results, fields) => {
        if (err) {
          console.log('Error querying database:', err);
          return res.status(500).send();
        }
        return res.status(200).json(results[0]);
      });
  }else{
      res.send(false);
  }   
})

app.post("/get_user_seller",(req,res)=>{
  let jwtStatus = TokenManager.checkAuthentication(req);
  if(jwtStatus!=false){
    const sql = 'SELECT owners.* FROM owners WHERE owners.owner_id = ?';
      connection.query(sql, [jwtStatus.id], (err, results, fields) => {
        if (err) {
          console.log('Error querying database:', err);
          return res.status(500).send();
        }
        return res.status(200).json(results[0]);
      });
  }else{
      res.send(false);
  }   
})
app.post("/get_shop",(req,res)=>{
  let jwtStatus = TokenManager.checkAuthentication(req);
  if(jwtStatus!=false){
    const sql = 'SELECT owners.*, shops.* FROM owners, shops WHERE owners.owner_id = shops.owner_id AND owners.owner_id = ?';
      connection.query(sql, [jwtStatus.id], (err, results, fields) => {
        if (err) {
          console.log('Error querying database:', err);
          return res.status(500).send();
        }
        return res.status(200).json(results[0]);
      });
  }else{
      res.send(false);
  }   
})

app.post("/shopSeller", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus != false) {
    const owner_id = jwtStatus.id;
    const shopname = req.body.shopname;
    const shipcom = req.body.shipcom;
    const image = req.body.imageBase64;

    // ตรวจสอบว่ามีร้านค้าของเจ้าของที่กำหนดอยู่แล้วหรือไม่
    const checkShopSql = 'SELECT * FROM shops WHERE owner_id = ?';
    const checkShopValues = [owner_id];

    connection.query(checkShopSql, checkShopValues, (checkShopErr, checkShopResults, checkShopFields) => {
      if (checkShopErr) {
        console.log("Error querying database:", checkShopErr);
        return res.status(400).send();
      }

      if (checkShopResults.length > 0) {
        // หากมีร้านค้าอยู่แล้วให้อัปเดตข้อมูล
        const updateSql = 'UPDATE shops SET shop_name = ?, shipcom_id = ?, image = ? WHERE owner_id = ?';
        const updateValues = [shopname, shipcom, image, owner_id];

        connection.query(updateSql, updateValues, (updateErr, updateResults, updateFields) => {
          if (updateErr) {
            console.log("Error querying database:", updateErr);
            return res.status(400).send();
          }

          return res.status(200).json({ message: "Shop updated successfully" });
        });
      } else {
        // หากไม่มีร้านค้าให้ทำการเพิ่มร้านค้าใหม่
        const insertSql = 'INSERT INTO shops(owner_id, shop_name, shipcom_id, image) VALUES (?, ?, ?, ?)';
        const insertValues = [owner_id, shopname, shipcom, image];

        connection.query(insertSql, insertValues, (insertErr, insertResults, insertFields) => {
          if (insertErr) {
            console.log("Error querying database:", insertErr);
            return res.status(400).send();
          }

          return res.status(201).json({ message: "Shop created successfully" });
        });
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});


app.post("/addProduct", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const owner_id = jwtStatus.id;
    const fullName = req.body.fullName;
    const addressDesc = req.body.addressDesc;
    const province = req.body.province;
    const district = req.body.district;
    const subdistrict = req.body.subdistrict;
    const postalCode = req.body.postalCode;
    const phoneNumber = req.body.phoneNumber;

    const sql = 'INSERT INTO products(shop_id, product_name,product_ description,category,sub_category                        '
    const values = [addressDesc, province, district, subdistrict, postalCode, phoneNumber, owner_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address updated successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/Shipping_Address", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const customer_id = jwtStatus.id;
    const fullName = req.body.fullName;
    const addressDesc = req.body.addressDesc;
    const province = req.body.province;
    const district = req.body.district;
    const subdistrict = req.body.subdistrict;
    const postalCode = req.body.postalCode;
    const phoneNumber = req.body.phoneNumber;

    const sql = 'INSERT INTO shipping_addresses(customer_id, recipient_name, recipient_address_details, recipient_subdistrict, recipient_district, recipient_province, recipient_zip_code,recipient_tel_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [customer_id, fullName, addressDesc, subdistrict, district, province, postalCode,phoneNumber];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address updated successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/get_addressShipping",(req,res)=>{
  let jwtStatus = TokenManager.checkAuthentication(req);
  if(jwtStatus!=false){
    const sql = 'SELECT s.* FROM shipping_addresses s, customers c WHERE c.customer_id = s.customer_id AND c.customer_id = ?';
      connection.query(sql, [jwtStatus.id], (err, results, fields) => {
        if (err) {
          console.log('Error querying database:', err);
          return res.status(500).send();
        }
        return res.status(200).json(results);
      });
  }else{
      res.send(false);
  }   
})




app.post("/addAddress", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const owner_id = jwtStatus.id;
    const fullName = req.body.fullName;
    const addressDesc = req.body.addressDesc;
    const province = req.body.province;
    const district = req.body.district;
    const subdistrict = req.body.subdistrict;
    const postalCode = req.body.postalCode;
    const phoneNumber = req.body.phoneNumber;

    const sql = 'UPDATE shops SET shop_address_details = ?, shop_province = ?, shop_district = ?, shop_sub_district = ?, shop_zip_code = ?, shop_tel_no = ? WHERE owner_id = ?';
    const values = [addressDesc, province, district, subdistrict, postalCode, phoneNumber, owner_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address updated successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/deleteAddress", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const owner_id = jwtStatus.id;
  
    const sql = " UPDATE shops SET shop_address_details = '', shop_province = '', shop_district = '', shop_sub_district = '', shop_zip_code = '', shop_tel_no = '' WHERE owner_id = ? ";
    const values = [owner_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address deleted successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});


app.post("/deleteAddress_customer", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const customer_id = jwtStatus.id;
    const fullName = req.body.fullName;

    const sql = "DELETE FROM shipping_addresses WHERE customer_id = ? AND recipient_name = ? ";
    const values = [customer_id, fullName];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address deleted successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/editAddress_customer", (req, res) => {
  const jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const customer_id = jwtStatus.id;
    const shipping_address_id = req.body.shipping_address_id; // เปลี่ยนจาก req.params เป็น req.body เพื่อรับค่า shipping_address_id
    const fullName = req.body.fullName;
    const addressDesc = req.body.addressDesc;
    const province = req.body.province;
    const district = req.body.district;
    const subdistrict = req.body.subdistrict;
    const postalCode = req.body.postalCode;
    const phoneNumber = req.body.phoneNumber;
  
    const sql = 'UPDATE shipping_addresses SET recipient_name = ?, recipient_address_details = ?, recipient_subdistrict = ?, recipient_district = ?, recipient_province = ?, recipient_zip_code = ?, recipient_tel_no = ? WHERE owner_id = ? AND shipping_address_id = ?';
    const values = [fullName, addressDesc, subdistrict, district, province, postalCode, phoneNumber, customer_id, shipping_address_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address updated successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});



app.post("/addBank", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const owner_id = jwtStatus.id;
    const fullName = req.body.fullName;
    const bankname = req.body.bankname;
    const accountNumber = req.body.accountNumber;
 
    const sql = " UPDATE owners SET owner_earning_account_no = ?, bankname = ? ,name_bank = ? WHERE owner_id = ? ";
    const values = [accountNumber, bankname, fullName,owner_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address updated successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/addCard", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const customer_id = jwtStatus.id;
    const fullName = req.body.fullName;
    const expiryDate = req.body.expiryDate;
    const cardNumber = req.body.cardNumber;

 
    const sql = " INSERT INTO payment_methods(customer_id, payment_method_name, expiry_date , account_number) VALUES (?, ?, ?, ?) ";
    const values = [customer_id, fullName, expiryDate, cardNumber];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address updated successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/get_Card",(req,res)=>{
  let jwtStatus = TokenManager.checkAuthentication(req);
  if(jwtStatus!=false){
    const sql = 'SELECT payment_method_name, account_number FROM payment_methods WHERE customer_id = ?';
      connection.query(sql, [jwtStatus.id], (err, results, fields) => {
        if (err) {
          console.log('Error querying database:', err);
          return res.status(500).send();
        }
        return res.status(200).json(results);
      });
  }else{
      res.send(false);
  }   
})

app.post("/deleteCard", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const customer_id = jwtStatus.id;
    const fullName = req.body.fullName;

    const sql = "DELETE FROM payment_methods WHERE customer_id = ? AND payment_method_name = ? ";
    const values = [customer_id, fullName];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address deleted successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.post("/get_Bank",(req,res)=>{
  let jwtStatus = TokenManager.checkAuthentication(req);
  if(jwtStatus!=false){
    const sql = 'SELECT owner_earning_account_no, bankname, name_bank FROM owners WHERE owner_id = ?';
      connection.query(sql, [jwtStatus.id], (err, results, fields) => {
        if (err) {
          console.log('Error querying database:', err);
          return res.status(500).send();
        }
        return res.status(200).json(results);
      });
  }else{
      res.send(false);
  }   
})


app.post("/deleteBank", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const owner_id = jwtStatus.id;
 
    const sql = "UPDATE owners SET owner_earning_account_no = '', bankname = '', name_bank = '' WHERE owner_id = ?";
    const values = [owner_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(400).send();
      }

      return res.status(200).json({ message: "Address deleted successfully." });
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});





// Start server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



app.post("/get_CartItems", (req, res) => {
  let jwtStatus = TokenManager.checkAuthentication(req);
  if (jwtStatus !== false) {
    const customer_id = jwtStatus.id;

    const sql = `
      SELECT 
        c.cart_id,
        c.quantity,
        p.product_id,
        p.product_name,
        p.product_description,
        p.shop_id,
        p.category,
        p.sub_category,
        p.variation1,
        p.option1,
        p.variation2,
        p.option2,
        p.product_unitprice,
        p.product_unitweight
      FROM 
        carts AS c
      INNER JOIN 
        products AS p ON c.product_id = p.product_id
      WHERE 
        c.customer_id = ?
    `;
    const values = [customer_id];

    connection.query(sql, values, (err, results, fields) => {
      if (err) {
        console.log("Error querying database:", err);
        return res.status(500).send();
      }

      return res.status(200).json(results);
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});


