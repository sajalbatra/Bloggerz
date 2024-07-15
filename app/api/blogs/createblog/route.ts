import { NextRequest, NextResponse } from 'next/server';
import client from '../../../../db';
import { useSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"

export async function POST(req: NextRequest) {
    const session = await getServerSession()
    console.log(session)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, content, published } = body;
    const currentUser = session.user;

    if (!currentUser?.email) {
      return NextResponse.json({ error: 'User email not found in session' }, { status: 400 });
    }

    const user = await client.user.findUnique({
      where: {
        email: currentUser.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newBlog = await client.blogs.create({
      data: {
        title,
        content,
        published,
        authorId: user.id,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
