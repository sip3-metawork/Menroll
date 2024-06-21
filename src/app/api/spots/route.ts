import { NextRequest, NextResponse } from "next/server";

import prisma from '../../../lib/prisma'

export function GET(request: NextRequest): NextResponse {
    // GET /api/users リクエストの処理
    console.log("GET to spots/route", request)

    //    prisma.

    return NextResponse.json(
        { response: 'OK' },
        {
            status: 200,
            headers: {
                "OK": "*"
            }
        }
    )
}

export function POST(request: NextRequest): NextResponse {
    // POST /api/users リクエストの処理
}