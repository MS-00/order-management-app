<?php

namespace App\Model;

enum OrderStatusEnum: string
{
    case CREATED = "created";
    case PENDING = "pending";
    case COMLETED = "comleted";
}
