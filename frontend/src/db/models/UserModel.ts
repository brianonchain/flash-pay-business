import mongoose, { Document, Schema } from "mongoose";

export type PaymentSettings = {
  merchantEvmAddress: string;
  merchantEmail: string;
  merchantName: string;
  merchantCountry: string;
  merchantCurrency: string;
  merchantPaymentType: string;
  merchantWebsite: string;
  merchantBusinessType: string;
  merchantFields: string[];
  merchantGoogleId: string;
  qrCodeUrl: string;
};

export type CashoutSettings = {
  cex: string;
  cexEvmAddress: string;
  cexApiKey: string;
  cexSecretKey: string;
  cexAccountName: string;
  employeePass: string;
};

export type Transaction = {
  date: any;
  customerAddress: string;
  merchantAddress: string;
  currencyAmount: number;
  currencyAmountAfterCashBack: number;
  merchantCurrency: string;
  tokenAmount: number;
  token: string;
  network: string;
  blockRate: number;
  cashRate: number;
  savings: string;
  refund: boolean;
  refundNote: boolean;
  archive: boolean;
  // online params
  customerEmail: string;
  item: string;
  startDate: string;
  endDate: string;
  singleDate: string;
  time: string;
  countString: string;
  shipping: any;
  sku: string;
  // txnHash
  txnHash: string;
};

export interface IUser extends Document {
  paymentSettings: PaymentSettings;
  cashoutSettings: CashoutSettings;
  transactions: Transaction[];
}

const userSchema: Schema = new mongoose.Schema<IUser>({
  paymentSettings: {
    merchantEvmAddress: String,
    merchantEmail: String,
    merchantName: String,
    merchantCountry: String,
    merchantCurrency: String,
    merchantPaymentType: String, // "online" | "inperson"
    merchantWebsite: String,
    merchantBusinessType: String,
    merchantFields: [String], // dates, count, sku, shipping, custom, <custom>,
    merchantGoogleId: String,
    qrCodeUrl: String,
  },
  cashoutSettings: {
    cex: String,
    cexEvmAddress: String,
    cexApiKey: String,
    cexSecretKey: String,
    cexAccountName: String,
    employeePass: String,
  },
  transactions: [
    {
      date: Date,
      customerAddress: String,
      currencyAmount: Number,
      currencyAmountAfterCashBack: Number,
      merchantCurrency: String,
      tokenAmount: Number,
      token: String,
      network: String,
      blockRate: Number,
      cashRate: Number,
      savings: String,
      merchantEvmAddress: String,
      refund: Boolean,
      refundNote: Boolean,
      archive: Boolean,
      // online params
      customerEmail: String,
      item: String,
      startDate: String,
      endDate: String,
      singleDate: String,
      time: String,
      countString: String,
      shipping: Object,
      sku: String,
      // txnHash
      txnHash: String,
    },
  ],
});

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
