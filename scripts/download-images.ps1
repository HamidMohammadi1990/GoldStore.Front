# دانلود تصاویر mock به public/images (نیاز به اینترنت)
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

New-Item -ItemType Directory -Force -Path public/images/hero, public/images/products, public/images/collections, public/images/blog | Out-Null

$static = @(
  @{ Path = 'public/images/hero/marina.jpg'; Seed = 'goldstore-hero-marina'; W = 1400; H = 700 },
  @{ Path = 'public/images/hero/fast-shipping.jpg'; Seed = 'goldstore-hero-fast-shipping'; W = 1400; H = 700 },
  @{ Path = 'public/images/hero/treasury.jpg'; Seed = 'goldstore-hero-treasury'; W = 1400; H = 700 },
  @{ Path = 'public/images/collections/marina.jpg'; Seed = 'goldstore-collections-marina'; W = 800; H = 600 },
  @{ Path = 'public/images/collections/iris.jpg'; Seed = 'goldstore-collections-iris'; W = 800; H = 600 },
  @{ Path = 'public/images/collections/jessica.jpg'; Seed = 'goldstore-collections-jessica'; W = 800; H = 600 },
  @{ Path = 'public/images/collections/superlight.jpg'; Seed = 'goldstore-collections-superlight'; W = 800; H = 600 },
  @{ Path = 'public/images/blog/b1.jpg'; Seed = 'goldstore-blog-b1'; W = 900; H = 560 },
  @{ Path = 'public/images/blog/b2.jpg'; Seed = 'goldstore-blog-b2'; W = 900; H = 560 },
  @{ Path = 'public/images/blog/b3.jpg'; Seed = 'goldstore-blog-b3'; W = 900; H = 560 },
  @{ Path = 'public/images/blog/b4.jpg'; Seed = 'goldstore-blog-b4'; W = 900; H = 560 }
)

foreach ($item in $static) {
  curl.exe -sL -o $item.Path "https://picsum.photos/seed/$($item.Seed)/$($item.W)/$($item.H)"
}

1..10 | ForEach-Object {
  $id = "p$_"
  curl.exe -sL -o "public/images/products/$id.jpg" "https://picsum.photos/seed/goldstore-product-$id/800/800"
  curl.exe -sL -o "public/images/products/$id-gallery-2.jpg" "https://picsum.photos/seed/goldstore-product-$id-g2/800/800"
  curl.exe -sL -o "public/images/products/$id-gallery-3.jpg" "https://picsum.photos/seed/goldstore-product-$id-g3/800/800"
}

Write-Host 'Images saved under public/images'
