import { NextResponse } from "next/server";

import Product from "../../../../mongo/Product";
import connectToDatabase from "../../../../lib/mongodb";


export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const product = await Product.create(body);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}