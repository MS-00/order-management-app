<?php

namespace App\Model;

enum OrderStatusEnum: string
{
    case CREATED = "created";
    case PENDING = "pending";
    case COMLETED = "comleted";

    public static function getValues(): array
    {
        return array_map(fn(self $status) => $status->value, self::cases());
    }
}
