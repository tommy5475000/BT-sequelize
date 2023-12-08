import initModels from "../models/init-models.js";
import  sequelize  from "../models/connect.js";

let model = initModels(sequelize);


//lấy danh sách like theo nhà hàng
export const getLikeRestaurant = async (req, res) => {
  
  let { resId } = req.params;
  
  let data = await model.like_res.findAll({
    where: {
      res_id: resId
    }
  })
  res.send(data)
  
}

//lấy danh sách like theo user
export const getLikeRestaurantByUser = async (req, res) => {
  
  let { userId } = req.params;
  
  let data = await model.like_res.findAll({
    where: {
      user_id: userId
    }
  })
  res.send(data)
  
}

//lấy danh sách đánh giá theo nhà hàng
export const getRateRes = async (req, res) => {
  let { resId } = req.params;
  let data = await model.rate_res.findAll({
      where: {
          res_id: resId
      }
  })
  res.send(data)
}
//lấy danh sách đánh giá theo user
export const getRateResByUser = async (req, res) => {
  let { userId } = req.params;
  let data = await model.rate_res.findAll({
      where: {
          user_id: userId
      }
  })
  res.send(data)
}




//thêm order

export const addOrder = async (req, res) => {
  let { userId } = req.params;
  let { foodId, amountAdd } = req.body;

  let newData = {
      user_id: userId,
      food_id: foodId,
      amount: amountAdd,
      code: "ABC" + Math.floor(Math.random() * 999),
      arr_sub_id: "DEF" + Math.floor(Math.random() * 999)
  }
  let data = await model.order_order.create(newData)

  res.send(data)
}

//xử lý like nhà hàng(like, unlike);
    
export const likeRes = async (req, res) => {
  let { userId } = req.params;
  let { resId, id } = req.body;

  //kiểm tra người dùng đã like nhà hàng chưa
  let checkLike = await model.like_res.findAll({
      where: {
          user_id: userId,
          res_id: resId
      }
  })

  //nếu chưa, thêm người dùng vào danh sách like (res_like)
  if (checkLike.length == 0) {
      let newData = {
          id: id,
          user_id: userId,
          res_id: resId,
          date_like: new Date()
      }
      await model.like_res.create(newData)
      return res.send(true)
  } else { //nếu đã like, xóa thông tin like trong danh sách res_like => unlike, trả kết quả false.
      await model.like_res.destroy({
          where: {
              user_id: userId,
              res_id: resId
          }
      })
  }
  res.send(false)
}

//xử lý đánh giá nhà hàng : thêm đấnh giá

export const rateRes = async (req, res) => {
  let { userId } = req.params;
  let { resId, amountAdd } = req.body;
  
  //kiểm tra người dùng đã đánh giá nhà hàng chưa
  let checkRate = await model.rate_res.findAll({
    where: {
      user_id: userId,
      res_id: resId,
      amount: amountAdd
    }
  })
  //nếu chưa, hoặc khác amount, thêm thông tin vào danh sách rate_res
  if (checkRate.length == 0) {
    let newData = {
      user_id: userId,
      res_id: resId,
      amount: amountAdd,
      date_rate: new Date()
    }
    await model.rate_res.create(newData)
    return res.send(newData)
    
  } else { //nếu đã đánh giá và trùng amount, ko thêm vào.
      return res.send(true)
  }

}