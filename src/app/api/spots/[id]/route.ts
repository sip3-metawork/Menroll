import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

import prisma from '../../../../lib/prisma'

export async function getServerSideProps(context) {
    const { id } = context.params;

    const spot = await await prisma.spot.findUnique({
        where: { id },
        include: {
            resources: true,
            clients: true
        }
    });

    return {
        props: {
            spot: spot || null,
        },
    };
}

export async function GET(req: NextRequest): NextResponse {
    // GET /api/users リクエストの処理

    //    prisma.
    console.log("GET to spots/route", req)

    return NextResponse.json(
        { response: spot },
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