import { NextRequest, NextResponse } from 'next/server';
import client from '../../../../db';

export  async function GET(req: NextRequest) {
  try {
    const blogs = await client.blogs.findMany();
    return NextResponse.json({ blogs }); 
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
