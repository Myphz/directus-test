import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	console.log('API HIT!', request.body);

	return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
