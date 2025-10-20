import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Токен не найден' },
        { status: 401 }
      )
    }

    // Проверка токена
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Недействительный токен' },
        { status: 401 }
      )
    }

    // Проверка сессии в базе данных
    const session = await prisma.session.findFirst({
      where: {
        userId: decoded.userId,
        token,
        expiresAt: {
          gt: new Date()
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            name: true,
            bio: true,
            avatar: true,
            music: true,
            badges: true,
            font: true,
            createdAt: true
          }
        }
      }
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Сессия не найдена или истекла' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { user: session.user },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
