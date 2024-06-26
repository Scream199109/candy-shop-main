import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from 'src/prisma.service';
import {returnUserObject} from './return-user.object'
import {Prisma} from '@prisma/client';
import {UserDto} from './user.dto';
import {hash} from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async getUserById(id: number, selectObject?: Prisma.UserSelect) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: false,
            slug: true,
          }
        },
        ...selectObject
      }
    })
    if (!user) {
      throw new Error('Пользователь не найден')
    }
    return user
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {email: dto.email}
    })
    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Email занят')
    }
    const user = await this.getUserById(id);

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password
      }
    })
  }
  async toggleFavorite(userId: number, productId: number) {
    const user = await this.getUserById(userId);

    if (!user) throw new NotFoundException('Пользователь не найден')

    const isExists = user.favorites.some(product => product.id === productId)

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId
          }
        }
      }
    })
    return {message: isExists ? 'Удален из избранного' : 'Успешно'}
  }
}
