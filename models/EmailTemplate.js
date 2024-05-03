const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailTemplateSchema = new Schema(
  {
    template_name: {
      type: String,
      unique: true,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    looping_text: {
        type: String,
    },
    placeholders: [
      {
        name: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let EmailTemplate = (module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema));

module.exports.CreateEmail = async () => {
    console.log("Running here")
    var newEmail = new EmailTemplate({
        template_name: "ORDER_PLACED",
        subject: "Your Ravendel Order is Confirmed! (Order {{order_number}})",
        body: `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
            html {
                margin: 0;
                padding: 0;
                width: 100%;
                background-color: #F1F1F1;
        
            }
        
            table {
                border-collapse: collapse;
        
            }
        
            img {
                border: 0;
                display: block;
            }
        
            .container {
                width: 100%;
                max-width: 600px;
                background-color: #4B7BEC;
                margin: 0 auto;
            }
        
            .logo {
                padding: 30px 0;
            }
            </style>
        </head>
        
        <body>
            <table width="100%" style="background-color: #F1F1F1;width: 100%; max-width: 600px; margin: 0 auto; ">
            <tr>
                <td align="center" bgcolor="#F1F1F1">
                <table class="container">
                    <!-- =====================================header ================================ -->
                    <tr>
                    <td align="center" colspan="3">
                        <img src="image_2023_02_16T05_36_50_013Z.png" style="
                    width: 130px;
                    border: 0px;
                    padding-top:80px;
                    display: inline-block !important;
                    " />
        
                        </a>
                    </td>
                    </tr>
                   
                    <tr>
                    <td colspan="3" style="
                font-family: 'Poppins', sans-serif;
                color: #ffffff;
                font-size: 38px;
                line-height: 48px;
                text-align:center;
                padding-top:0px;
                font-weight: 400;
                letter-spacing: 0px;
                padding: 0px;
                padding-bottom: 30px;
                ">
                        <p style="margin:0px; margin-top:62px; font-weight:600;">Thanks for your order!</p>
                    </td>
        
                    </tr>
                    
                    <tr>
                    <td colspan="3" style="padding:0">
                        <img src="delivered.png" width="600" alt="Header" style="
                width: 600px;
                max-width: 600px;
                border:none
                " />
                    </td>
                    </tr>
        
                    <!-- =====================================header end ============================== -->
        
                    <!-- ================================================content==================================== -->
                    <tr>
                    <td colspan="3" style="
                font-family: 'Poppins', sans-serif;
                color: #191919;
                font-size: 18px;
                line-height: 28px;
                font-weight: 600;
                letter-spacing: 0px;
                padding: 0px;
                padding-bottom: 20px;
                background-color:#fff;
                ">
                        <p style="margin:0; padding-left:40px">Hello {{user_name}},</p>
                    </td>
                    </tr>
                    <tr>
                    <td colspan="3" style="
                font-family: 'Poppins', sans-serif;
                color: #595959;
                font-size: 16px;
                line-height: 26px;
                font-weight: 400;
                background-color:#fff;
                letter-spacing: 0px;
                padding: 0px;
                ">
                        
                        
            <p style="margin:0; padding-left:40px; padding-right: 40px;">We're delighted that you find something you liked. Your order {{order_number}} has been placed successfully. </p>
                    </td>
                    </tr>
                    <tr>
                      <td colspan="3" style="
                  font-family: 'Poppins', sans-serif;
                  color: #595959;
                  font-size: 16px;
                  line-height: 26px;
                  font-weight: 400;
                  background-color:#fff;
                  letter-spacing: 0px;
                  padding: 0px;
                  ">
                          
                          
              <p style="margin:0;padding-left:40px; padding-top: 30px;">We're getting your goodies ready to head your way ASAP!  </p>
                      </td>
                      </tr>
                    <!-- ===============================================content ===================================== -->
        
                    <!-- ================================================order date and number ================== -->
        
                    <tr style="background-color: #fff; padding:30px;padding-left:40px; padding-right:70px">
                    <td colspan="3" style="padding-top: 30px;">
                        <table style=" width: 100%;">
                        <tr>
                            <td style="
                            font-family: 'Poppins', sans-serif;
                            color: #191919;
                            font-size: 18px;
                            line-height: 28px;
                            font-weight: 600;
                            letter-spacing: 0px;
                            padding-left: 40px;
                            padding-right: 20px;
                            ">
                            Order Number :
                            <span style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 16px;
                                line-height: 28px;
                                font-weight: 400;
                                letter-spacing: 0px;
                                ">
                                {{order_number}}</span>
                            </td>
                            <td style="
                                    font-family: 'Poppins', sans-serif;
                                    color: #191919;
                                    font-size: 18px;
                                    line-height: 28px;
                                    font-weight: 600;
                                    letter-spacing: 0px;
                                    ">
                            Order Date :
                            <span style="
                            font-family: 'Poppins', sans-serif;
                            color: #595959;
                            font-size: 16px;
                            line-height: 28px;
                            font-weight: 400;
                            letter-spacing: 0px;
                                ">
                                {{order_date}}</span>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
        
                    <!-- ================================================order date and number ================== -->
        
                    <!-- ================================================payment and bill ================== -->
        
                    <tr style="background-color: #fff; padding:30px;padding-left:40px; padding-right:60px">
                    <td colspan="3" style="padding-top: 30px; padding-bottom:22px">
                        <table style=" width: 100%;">
                        <tr>
                            <td>
                            <p style="
                                    font-family: 'Poppins', sans-serif;
                                        color: #191919;
                                        font-size: 18px;
                                        line-height: 28px;
                                        font-weight: 600;
                                        letter-spacing: 0px;
                                        padding: 0px;
                                        margin:0px;
                                        padding-left:40px;
                                        
                                            ">
                                Payment Status :
                            </p>
                            <p style="
                                background-color: #d1f3e6;
                                color: #18c184;
                                font-family: 'Poppins',
                                sans-serif;
                                font-size: 16px;
                                font-weight: 400;
                                display: inline-block;
                                margin-top:5px;
                                margin-left:40px;
                                
                                letter-spacing: 0px;
                                padding: 5px 10px;
                                border-radius: 4px;
                                            ">
                              {{payment_status}}
                            </p>
                            <p style="
                                            font-family: 'Poppins', sans-serif;
                                                color: #191919;
                                                font-size: 18px;
                                                line-height: 28px;
                                                font-weight: 600;
                                                letter-spacing: 0px;
                                                padding: 0px;
                                                padding-top:8px;
                                                margin:0px;
                                                padding-left:40px;
                                        
                                                
                                                padding-bottom: 5px;
                                                    ">
                                Payment Method :
                            </p>
                            <p style="
                                        font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 26px;
                                        margin:0px;
                                        font-weight: 400;
                                        padding-left:40px;
                                    
                                        letter-spacing: 0px;
                                                ">
                                {{payment_method}}
                            </p>
                            </td>
                            <td style="padding-left: 114px;">
                            <p style="
                                font-family: 'Poppins', sans-serif;
                                color: #191919;
                                font-size: 18px;
                                line-height: 28px;
                                font-weight: 600;
                                letter-spacing: 0px;
                                padding: 0px;
                                margin:0px;
                                padding-bottom: 5px;
                                        ">
                                Billing Address :
                            </p>
                            <p style="
                            font-family: 'Poppins', sans-serif;
                            color: #595959;
                            font-size: 16px;
                            line-height: 26px;
                            font-weight: 400;
                            margin:0px;
                            letter-spacing: 0px;
                                        ">
                            <p style="margin: 0px;font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 26px;
                                        font-weight: 400;
                                        letter-spacing: 0px;"></p>
                            <p style="margin: 0px;font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 26px;
                                        font-weight: 400;
                                        letter-spacing: 0px;">{{billing_address}}</p>
                            <p style="margin: 0px;font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 26px;
                                        font-weight: 400;
                                        letter-spacing: 0px;"> {{billing_state}}, {{billing_city}} {{billing_zip}}, </p>
                            <p style="margin: 0px;font-family: 'Poppins', sans-serif;
                                        color: #595959;
                                        font-size: 16px;
                                        line-height: 26px;
                                        font-weight: 400;
                                        letter-spacing: 0px;">{{billing_country}}.</p>
        
                            </p>
                            </td>
        
                        </tr>
                        </table>
                    </td>
                    </tr>
                    <!-- ================================================payment and bill ================== -->
        
                    <!-- ================================================product start ================== -->
         
        {{looping}}
        
                    <!-- ================================================product end ================== -->
                    
                    <!-- =======================================sub total ============================================= -->
                    <tr style="background-color: #fff;">
                    <td colspan="3">
                        <table style="width: 100%;">
        
                        <td align="left" valign="middle" class="center-text" style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 18px;
                                line-height: 28px;
                                font-weight: 400;
                                padding-left:40px;
                                letter-spacing: 0px;
                            ">
                            Sub Total
                        </td>
                        <td align="right" style="
                            font-family: 'Poppins', sans-serif;
                            color: #595959;
                            font-size: 18px;
                            line-height: 28px;
                            font-weight: 600;
                            padding-right:37px;
                            letter-spacing: 0px;
                            ">
                            {{pricing_subtotal}}
                        </td>
        
                        </table>
                    </td>
                    </tr>
                    <tr style="background-color: #fff;">
                    <td style="padding-top: 10px;"></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr style="background-color: #fff;">
                    <td colspan="3">
                        <table style="width: 100%;">
        
                        <td align="left" class="center-text" style="
                                font-family: 'Poppins', sans-serif;
                                color: #595959;
                                font-size: 18px;
                                line-height: 28px;
                                font-weight: 400;
                                padding-left:40px;
                                letter-spacing: 0px;
                            ">
                            Discount
                        </td>
                        <td align="right" style="
                            font-family: 'Poppins', sans-serif;
                            color: #fc5c65;
                            font-size: 18px;
                            padding-right:37px;
                            line-height: 28px;
                            font-weight: 600;
                            letter-spacing: 0px;
                            ">
                            - {{pricing_discount}}
                        </td>
        
                        </table>
                    </td>
                    </tr>
                    <tr style="background-color: #fff;">
                    <td style="padding-top: 10px;"></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr style="background-color: #fff;">
                    <td colspan="3">
                        <table style="width: 100%;">
        
                        <td align="left" style="
                            font-family: 'Poppins', sans-serif;
                            color: #595959;
                            font-size: 18px;
                            padding-left:40px;
                            line-height: 28px;
                            font-weight: 400;
                            letter-spacing: 0px;
                        ">
                            Tax
                        </td>
                        <td align="right" style="
                        font-family: 'Poppins', sans-serif;
                        color: #595959;
                        font-size: 18px;
                        line-height: 28px;
                        font-weight: 600;
                        letter-spacing: 0px;
                        padding-right:37px;
                        ">
                            {{pricing_tax}}
                        </td>
                        </table>
                    </td>
                    </tr>
                    <tr style="background-color: #fff;">
                    <td style="padding-top: 10px;"></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr style="background-color: #fff;">
                    <td colspan="3">
                        <table style="width: 100%;">
        
                        <td align="left" style="
                                    font-family: 'Poppins', sans-serif;
                                    color: #595959;
                                    font-size: 18px;
                                    line-height: 28px;
                                    padding-left:40px;
                                    font-weight: 400;
                                    letter-spacing: 0px;
                                    ">
                            Shipping Charge
                        </td>
                        <td align="right" style="
                                    font-family: 'Poppins', sans-serif;
                                    color: #595959;
                                    font-size: 18px;
                                    padding-right:37px;
                                    line-height: 28px;
                                    font-weight: 600;
                                    letter-spacing: 0px;
                                ">
                            {{pricing_shipping}}
                        </td>
                        </table>
                    </td>
                    </tr>
                    <!-- ========================================sub total =================================== -->
                    <tr style="background-color: #fff;">
                    <td style="padding-top: 20px;"></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <!-- =========================================total ==================================== -->
                    <tr style="background-color: #fff; ">
                    <td colspan="3">
                        <table style="width: 100%;">
        
                        <td align="left" style="
                                font-family: 'Poppins', sans-serif;
                                color: #191919;
                                font-size: 22px;
                                padding-left:38px;
                                line-height: 32px;
                                font-weight: 600;
                                letter-spacing: 0px;
                            ">
                            Total
        
                            <span style="
                                font-family: 'Poppins', sans-serif;
                                color: #999999;
                                font-size: 12px;
                                line-height: 28px;
                                font-weight: 600;
                                letter-spacing: 0px;
                            ">
                            (Inc. Tax)</span>
                        </td>
                        <td align="right" style="
                            font-family: 'Poppins', sans-serif;
                            color: #191919;
                            font-size: 22px;
                            line-height: 32px;
                            padding-right:35px;
                            font-weight: 600;
                            letter-spacing: 0px;
                            ">
                            {{pricing_total}}
                        </td>
                    </tr>
                    <!-- =========================================total ==================================== -->
        
                    <tr style="background-color: #fff;">
                    <td style="padding-top: 30px;"></td>
                    <td></td>
                    <td></td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
        </body>
        </html>
        `,
        placeholders:[
            {
                name: "{{user_name}}",
                description: "Name of user who purchased the product"
            },
            {
                name: "{{order_number}}",
                description: "Order Number in database"
            },
            {
                name: "{{order_date}}",
                description: "Date on which order placed"
            },
            {
                name: "{{payment_status}}",
                description: "Status of payment  enum:['processing', 'pending', 'failed', 'success', 'cancelled']"
            },
            {
                name: "{{payment_method}}",
                description: "Payment Method used by user to pay"
            },
            {
                name: "{{billing_address}}",
                description: "Delivery address of product"
            },
            {
                name: "{{billing_state}}",
                description: "State of Billing Address"
            },
            {
                name: "{{billing_city}}",
                description: "City of Billing Address"
            },
            {
                name: "{{billing_zip}}",
                description: "Zipcode of Billing Address"
            },
            {
                name: "{{billing_country}}",
                description: "Country of Billing Address"
            },
            {
                name: "{{pricing_subtotal}}",
                discription: "Cart total of products"
            },
            {
                name: "{{pricing_discount}}",
                discription: "Total discount amount"
            },
            {
                name: "{{pricing_tax}}",
                discription: "Total Tax"
            },
            {
                name: "{{pricing_shipping}}",
                discription: "Shipping charges"
            },
            {
                name: "{{pricing_total}}",
                discription: "Total Amount"
            },
        ],
        looping_text:`
        <tr style="background-color: #fff; ">
        <td style="width: 50px; padding-left:40px; padding-right:20px">

          <img src="{{product_url}}" style="
                display: inline-block !important;
                border: 0;
                width: 100px;
                max-width: 100px;
                border-radius: 8px;
              " />
        </td>
        <td style="
                            font-family: 'Poppins', sans-serif;
                            color: hsl(0, 0%, 10%);
                            font-size: 18px;
                            line-height: 28px;
                            font-weight: 600;
                            letter-spacing: 0px;
                            padding: 0px;
                            padding-bottom: 5px;
                          ">
          {{product_name}}

          <p style="
                            font-family: 'Poppins', sans-serif;
                            color: #595959;
                            font-size: 16px;
                            line-height: 26px;
                            font-weight: 400;
                            letter-spacing: 0px;
                            margin:0px;
                            padding-top:5px
                          ">
            Qty: {{product_quantity}} , Price: {{product_price}}
          </p>
        </td>
        <td style="
                          font-family: 'Poppins', sans-serif;
                          color: #191919;
                          font-size: 20px;
                          line-height: 30px;
                          font-weight: 600;
                          letter-spacing: 0px;
                        ">
          {{product_total_price}}
        </td>

      </tr>
      
      <tr style="background-color: #fff;">
        <td style="padding-top: 10px;"></td>
        <td></td>
        <td></td>
      </tr>
        `,

    })

    await newEmail.save();
}