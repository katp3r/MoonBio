import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { hashPassword } from '@/lib/auth'

export async function PUT(request: NextRequest) {
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

    const body = await request.json()
    // body может содержать несколько полей: name, bio, music, badges, font, avatar (путь), banner (путь)
    // УБРАНО banner!!
    const allowedFields = ["name", "bio", "music", "badges", "font", "avatar"];
    let updateData: any = {};
    for (const key of allowedFields) {
      if (key in body) {
        updateData[key] = body[key];
      }
    }
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Нет данных для обновления' }, { status: 400 });
    }
    // Если username/email — убедиться, что нет дубликатов и т.д. (можно добавить по аналогии)
    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        music: true,
        badges: true,
        avatar: true,
        createdAt: true
      }
    })
    return NextResponse.json(
      {
        message: 'Профиль успешно обновлен',
        user: updatedUser
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update profile error:', error, (error instanceof Error && error.stack) ? error.stack : '');
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
