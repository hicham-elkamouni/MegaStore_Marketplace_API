# MegaStore Marketplace

## Project context
```
MarketPlace is an online platform for the sale of multiple products by multiple sellers. MegaStore needs to develop its online platform MultiLanguage (Fr/Eng) The platform will be organized in 4 parts Customer, Seller SuperAdmin and Admin
```

> SuperAdmin Role:
```
We have only one SuperAdmin who can confirm each registration of a seller by an administrative document He can deactivate the account of a seller He can add several admins
```

> Admin Role:
```
Each Admin can confirm the orders received by the customers If there are any delivery or return problems, he can contact the customers by email or phone He can add Standard deliverers (5 days delivery) Express deliverers (1 day)
```

> Seller Role:
```
To sell on MegaStore, the seller must be registered and validated by the Super Admin When registering, he/she must send a document proving his/her fiscal identity There are 3 types of seller (Starter, Pro and Expert)

By default the account of a seller is Starter is limited to 10 different products with Standard Delivery

Pro account: allows to sell 50 products with Standard Delivery

Expert Account: Sell unlimited products and offers Express+ Standard Delivery by MegaStore

If the seller generates more than 5000 Dhs of turnover, it goes directly to the Pro account

If the seller generates more than 20 000 Dhs of turnover he/she goes directly to the Expert Account

If the seller wants to buy a pack without generating a turnover, he can proceed to the payment method (Bank Transfer or Card Payment)

The price of a Pro Account: 3000 dhs The price of an Expert Account: 5000 dhs

To add a product on MegaStore, you have to specify 2 currencies minimum, the default currency and the MAD (Api)

Each Seller can have his own sales statistics
```

> Customer Role:
```
On the customer's home page, the most popular and best selling products are displayed The customer can choose the product categories The customer can switch between languages (Fr /En)

The customer can choose the currency he wants The customer can filter the products by Price, Date, Brand (if any)

To place an order, the customer must be registered, he must validate his registration by clicking on the validation email sent to his email box The customer can start a whatsapp discussion with the MegaStore admin Each order placed by the customer must be validated by the admin To pay for an order, the customer has the choice to pay on delivery or online via a solution such as Paypal (Api) or Stripe(Api)
```

## Required work:
```
- Create your MongoDb database

- Develop the Api in Node Js respecting the MVC layers

- Add the appropriate unit tests to your methods

- Add logs for each validated command

- To avoid XSS attacks, try to use attribute validations at the back end + regular expressions) Create the Class Diagram related to the creation of the MarketPlace Propose an adequate project management scheme with a tool like Jira or Trello...

Send an email (myoussefsbai@simplon.co) of the report of your brief with the explanations on the blocking points of the brief and the adopted solutions
```
## Learning methods
```
Work in group
Deadline 24/03/2022
```

## Teams
```
@yassineelhoubi
@YounessHassoune
@hicham-elkamouni
@RAFIKENEFIDA
```