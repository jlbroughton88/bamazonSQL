var mysql = require("mysql")
var inquirer = require("inquirer")

var con = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + con.threadId);
    queryAllProducts();
    con.end();
})

function queryAllProducts() {
    con.query('SELECT * FROM products', (err, rows) => {
        if (err) throw err;
        console.log("----------------------------")
        console.log("   ")
        console.log("Here are our products, feel free to take a look around.")
        console.log("    ")
        console.log("-----------------------------")

        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i].item_id + " | " + rows[i].product_name + " | " + rows[i].department_name
                + " | " + "$" + rows[i].price + " | " + rows[i].stock_quantity + " in stock!")
            console.log("------------------------------")
        }
        console.log("   ")
        getAction();
    })
}


// * The first should ask them the ID of the product they would like to buy.
// * The second message should ask how many units of the product they would like to buy.
function getAction() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the product that you'd like to buy?",
            name: "idAsk",
        },
        {
            type: "input",
            message: "How many units of this would you like to buy?",
            name: "quantityAsk",
        }
    ]).then(function (answer) {
        // parseInt(answers.idAsk);
        // console.log("--------------------------")
        // if (answers.idAsk < 1) {
        //     console.log("Please type in an item...")

        // } else if (answers.idAsk < 11 && answers.quantityAsk < 50) {
        //     console.log("We have that item!")
        // } else {
        //     console.log("We're sorry, we dont have that item here...")
        // }

        // if (answers.quantityAsk < 50) {
        //     console.log("We can do that for you!")
        // } else {
        //     console.log("Unfortunately, we cant get you that many...")
        //     console.log()
        // }
        // console.log("--------------------------")
        //     })
        // }
        // getAction();
        // parseInt(answers.idAsk);
        con.query("SELECT * FROM products WHERE item_id =?", [answer.idAsk], function (err, res) {
            console.log("Heres a quick summary of your order: " + answer.quantityAsk + " " + res[0].product_name);
            if (res[0].stock_quantity > answer.quantityAsk) {
               con.query("UPDATE products SET ? where ?", [
                    {
                        stock_quantity: res[0].stock_quantity - answer.quantityAsk
                    },
                    {
                        item_id: answer.idAsk
                    }], function () {
                        console.log("Your order of " + answer.quantityAsk + " " + res[0].product_name + " has been placed.")
                        queryAllProducts();
                    })
            } else {
                console.log("We're sorry, according to our systems, we do not have enough " + res[0].product_name + ".");
                queryAllProducts();
            }
        })
    })
}


            // console.log("--------------------------")

            // if (res.idAsk < 11 && res.quantityAsk < 50) {
            //     console.log("We have that item!\n Lets get you situated.")
            // } else {
            //     console.log("We're sorry, we dont have that item here...")
            // }

            // if (res.quantityAsk < 1 || res.idAsk < 1) {
            //     console.log("Unfortunately, we cant help you out.")
            // }
            // console.log("--------------------------")
//     })
//     }
// 
