export default async function handleOffers (data, users, io) {
    try {
      
      // adjust item info in db
      const itemUpdate = {
        sold_status: true,
        buyer_id: data.offer.offerer_id
      }
      // update item
      const item = await Item.update(itemUpdate, {where:{id: data.offer.Item.id}},)
      // delete offer
      const res = await Offer.update({accepted:true}, { where: { id: data.offer.id } });
      console.log("res:", res)

      // send notification to offerer
      // io.to(users[data.offer.offerer_id]).emit("done_deal");
      socket.emit('accept_res')
    } catch (error) {
      console.log("error:", error)
    }
}