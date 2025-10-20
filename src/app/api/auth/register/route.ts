import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, username, inviteCode, password } = await request.json()

    // Валидация
    if (!email || !username || !inviteCode || !password) {
      return NextResponse.json(
        { error: 'Все поля обязательны' },
        { status: 400 }
      )
    }

    // Проверка инвайт кода (пока простой список)
    const validInviteCodes = ['MOON2024', 'BETA2024', 'TEST123'];
    if (!validInviteCodes.includes(inviteCode)) {
      return NextResponse.json(
        { error: 'Неверный инвайт код' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      )
    }

    // Проверка существования пользователя
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email или username уже существует' },
        { status: 409 }
      )
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password)

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email,
        username,
        name: username, // Используем username как отображаемое имя
        password: hashedPassword,
        music: null,
        badges: "[]"
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        avatar: true,
        createdAt: true
      }
    })

    // Генерация токена
    const token = generateToken({ userId: user.id, email: user.email })

    // Сохранение сессии
    await prisma.session.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 дней
      }
    })

    const response = NextResponse.json(
      { 
        message: 'Пользователь успешно зарегистрирован',
        user,
        token 
      },
      { status: 201 }
    )

    // Установка cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 дней
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
