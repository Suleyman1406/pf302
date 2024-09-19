import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import { Avatar, Box, Skeleton } from "@mui/joy";

export function ProductCard({ product }) {
  const { name, imgPath, creator, price } = product;
  const { name: creatorName, profileImgPath } = creator;
  const { value, currency } = price;
  return (
    <Card>
      <div>
        <Typography level="title-lg">{name}</Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
          <Avatar sx={{ width: 24, height: 24 }} src={profileImgPath}>
            {creatorName[0]}
          </Avatar>
          <Typography level="body-sm" fontSize={12}>
            {creatorName}
          </Typography>
        </Box>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio ratio="15/16">
        <img src={imgPath} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography sx={{ fontSize: "lg", fontWeight: "lg" }}>
            {value} {currency}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

ProductCard.Skeleton = function ProductCardSkeleton() {
  return (
    <Card>
      <div>
        <Skeleton variant="text" width="60%" />
        <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center" }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width="40%" />
        </Box>
        <Skeleton
          width={24}
          height={24}
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        />
      </div>
      <AspectRatio ratio="15/16">
        <Skeleton variant="rectangular" />
      </AspectRatio>
      <div>
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" width="60%" height={24} />
      </div>
    </Card>
  );
};
