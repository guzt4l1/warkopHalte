document.addEventListener('alpine:init' , ()=>{
    Alpine.data('products', ()=> ({
        items: [
            { id :1,name : 'JawaRaung Robusta',img:'robusta.jpeg',price:35000 ,nodiscount :55000},
            { id :2,name : 'JawaRaung Arabica',img:'arabica.jpeg',price:45000 ,nodiscount :50000},
            { id :3,name : 'Lokal Tubruk',img:'local.jpg',price:28000 ,nodiscount :32000}
        ]
    })) 

    Alpine.store('cart', {
        items : [],
        total : 0,
        qty :0,
        isGatewayOpen: false,
        add(newItem){

            const cartItem = this.items.find((item) => item.id === newItem.id);
            if(!cartItem) {
                this.items.push({...newItem ,qty:1,total: newItem.price});
                this.qty++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) =>{
                    if (item.id !== newItem.id){
                        return item;
                    } else {
                        item.qty ++;
                        item.total = item.price * item.qty;
                        this.qty++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },
        remove(id){
            const cartItem = this.items.find((item) => item.id === id);

            if(cartItem.qty > 1){
                this.items = this.items.map((item) => {
                    if(item.id !== id){
                        return item;
                    } else{
                        item.qty--;
                        item.total = item.price * item.qty;
                        this.qty--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.qty === 1){
                this.items = this.items.filter((item) => item.id !==id);
                this.qty--;
                this.total -= cartItem.price;
            }
        }
    });
});

function showItemDetail(item) {
    // Akses properti item (img, name, price, dll)
    console.log("Detail barang:", item.name, item.price);
    this.selectedItem = item; // Set selectedItem dengan objek item
    this.isModalOpen = true; // Tampilkan modal
    itemDetailModal.style.display = 'flex';
  }

  document.addEventListener('click', (e) => {
    // Klik di luar modal
    if (e.target === document.getElementById('item-detail-modal')) {
      this.isModalOpen = false;
    }
  })
  function showGateway() {
    this.isGatewayOpen = true; // Atur visibilitas gateway ke true
    gateway.style.display = 'grid';
    } 
  function close() {
    this.isGatewayOpen = false; // Atur visibilitas gateway ke true
    gateway.style.display = 'none';
    } 
    

const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID' , {
        style : 'currency',
        currency : 'IDR',
        minimumFractionDigits : 0
    }).format(number)
};