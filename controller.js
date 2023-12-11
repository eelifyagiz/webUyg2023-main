const dbConn=require("../db/mysql_connect")
const bcrypt=require("bcrypt")
const login=async(req,res)=>{
    const username=req.body.username
    const password=req.body.sifre
    dbConn.query("SELECT * FROM users WHERE username=?, password=?",
    [username],(error,results)=>{
        if(results.length>0){
            const comparePassword=bcrypt.compare(password,results[0].password)
            if(comparePassword){
                return res.status(203).json({
                    success:true,
                    message:"Kullanıcı Girişi Başarılı"
                })
            }else{
                return res.status(203).json({
                    success:false,
                    message:"Kullanıcı veya Şifre Uyumsuz"
                })
            }
        }else{
            return res.status(203).json({
                success:false,
                message:"Kullanıcı Girişi Başarısız"
            })
        }
    })
}

const register=async(req,res)=>{
    const kullanici_adi=req.body.kullanici_adi
    const sifre=await bcrypt.hash(req.body.sifre,10)
    const eposta=req.body.eposta
    const adi=req.body.adi
    const soyadi=req.body.soyadi
    const tel_no=req.body.tel_no
    const cinsiyet=req.body.cinsiyet
    const dogum_tarihi=req.body.dogum_tarihi
    dbConn.query("select * from kullanicilar where kullanici_adi=?",kullanici_adi,(err,result)=>{
     if(result.length>0){
         return res.status(201).json({
             success:false,
             message:"Kayıt Mevcut"
         })
     }else{
         dbConn.query("INSERT INTO kullanicilar (kullanici_adi,sifre,eposta,adi,soyadi,tel_no,cinsiyet,dogum_tarihi) VALUES (?,?,?,?,?,?,?,?)"
         ,[kullanici_adi,sifre,eposta,adi,soyadi,tel_no,cinsiyet,dogum_tarihi],(err,result)=>{
             if(!err){
                 return res.status(201).json({
                     success:true,
                     message:"Kayıt Başarılı"
                 })
             }else{
                 console.log(err)
             }
               
 
         })    
     }
    })
 }

 
const createCustomer=async(req,res)=>{
    const {musteri_adi,musteri_soyadi,musteri_telefonu,Cinsiyet} = req.body;
    dbConn.query("INSERT INTO `musteri` (`musteri_adi`, `musteri_soyadi`, `musteri_telefonu`, `Cinsiyet`) VALUES ('" + musteri_adi + "','" + musteri_soyadi + "','" + musteri_telefonu + "','" + Cinsiyet + "')")
    return res.status(200).json({
        success:true,
        message:"Kayıt Başarılı"
    })
}

module.exports={login,register,createCustomer}
