import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
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

    // Удаление сессии
    await prisma.session.deleteMany({
      where: {
        userId: decoded.userId,
        token
      }
    })

    const response = NextResponse.json(
      { message: 'Успешный выход' },
      { status: 200 }
    )

    // Удаление cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
