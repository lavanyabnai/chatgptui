import type {  CcyConversionMaster } from "@prisma/client";

import { prisma } from "~/db.server";

export function getCurrency({
  bkt,
  
}: Pick<CcyConversionMaster, "bkt"> ) {
  return prisma.ccyConversionMaster.findFirst({
    select: { bkt: true, ccy_code: true, exchange_rate: true },
    where: { bkt },
  });
}

export function getCurrencyListItems() {
  return prisma.ccyConversionMaster.findMany();
}

export function createCurrency({
  bkt,
  ccy_code,
  exchange_rate,
}: Pick<CcyConversionMaster, "bkt" | "ccy_code" | "exchange_rate"> ) {
  return prisma.ccyConversionMaster.create({
    data: {
      bkt,
      ccy_code,
    exchange_rate,
    },
  });
}

