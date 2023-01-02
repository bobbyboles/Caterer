const port = 3000;
const app = require("./app");
const {db} = require ('./db')
const {User} = require('./db')
const {Contract} = require('./db')

const syncAndSeed = async () => {
    await db.sync({
        force:true
    })

    await User.create({
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com', 
        isAdmin: true,
        passWord: 'password',
    }) 
    await User.create({
        firstName: 'Bob',
        lastName: 'Boles',
        email: 'rdb3216@gmail.com', 
        isAdmin: false,
        dateOfInterest: new Date(),
        passWord: 'chicken',
    }) 
    await User.create({
        firstName: 'Corbin',
        lastName: 'Dallas',
        email: 'cDallas@gmail.com', 
        isAdmin: false,
        dateOfInterest: new Date(),
        passWord: 'cDallas',
    }) 
    await Contract.create({
        date: new Date(),
        guestCount: 20,
        package: 'King',
        layout: 'BoardRoom',
        totalPrice: 100.00,
        status: true
    })
    await Contract.create({
        date: new Date('Fri Dec 23 2022'),
        guestCount: 23,
        package: 'Jack',
        layout: 'BoardRoom',
        totalPrice: 100.00,
        status: true
    })
    await Contract.create({
        date: new Date('Thu Dec 22 2022'),
        guestCount: 15,
        package: 'Queen',
        layout: 'SeperateTables',
        totalPrice: 3000.00,
        status: false
    })
    
    const bob = await User.findByPk(2)
    const dinner = await Contract.findByPk(1)
    
    bob.addContract(dinner)
    // console.log(bob)
    // console.log(dinner)
    // consol.log(Object.keys(User.__proto__))

}


syncAndSeed().then(()=> app.listen(port, () => console.log(`listening on port ${port}`)));
