const {Item, Offer, User, Message} = require('../../models')

async function acceptOffer(data, users, socket, io) {
  try {
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
    const buyer = await User.findByPk(data.offer.offerer_id)
    const seller = await User.findByPk(data.offer.Item.seller_id)
    const messageItem = await Item.findByPk(data.offer.Item.id)
    
    const message = `Hello ${buyer.userName}. ${seller.userName} has accepted your offer for a/an ${messageItem.title}`  
    
    const newMessage = await Message.create({text: message})
    newMessage.setSender(seller)
    newMessage.setRecipient(buyer)

      // console.log('===\n\n\ntest\n\n\n===')
      // console.log("users:", users)
      // console.log("data.offer.offer_id:", data)
      // console.log("users[]:", users[data.offer.offerer_id])
      
    io.to(users[data.offer.offerer_id]).emit("done_deal");
    socket.emit("accept_res");
  } catch (error) {
    console.log("error:", error);
  }
}
 module.exports = acceptOffer