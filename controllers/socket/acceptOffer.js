const {Item, Offer, User} = require('../../models')

async function acceptOffer(data, users, socket, io) {
  try {
console.log("1 data:", data)  
  // adjust item info in db
    const itemUpdate = {
      sold_status: true,
      buyer_id: data.offer.offerer_id,
    };
    // update item
    const item = await Item.update(itemUpdate, {
      where: { id: data.offer.Item.id },
    });
    // delete offer
    const res = await Offer.update(
      { accepted: true },
      { where: { id: data.offer.id } }
    );

    // send notification to offerer
    // create message in db 
    // message: Hello user(data.offer.Offerer_id), other user(data.offer.Item.seller_id) has accepted your offer for item (data.offer.item.title)
    // fetch users names and item name
    const buyer = await User.findByPk(data.offer.offerer_id)
    const seller = await User.findByPk(data.offer.Item.seller_id)
    const messageItem = item.title
    console.log("item:", item)
    
    const message = `Hello ${buyer.userName}. ${seller.userName} has accepted your offer for ${item}`  
    console.log('===\n\n\ntest\n\n\n===')
    console.log("message:", message)
    console.log('===\n\n\ntest\n\n\n===')

    // io.to(users[data.offer.offerer_id]).emit("done_deal");
    socket.emit("accept_res");
  } catch (error) {
    console.log("error:", error);
  }
}
 module.exports = acceptOffer