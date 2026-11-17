import { toast } from "sonner";
import { getProduct } from "./catalog";
import { cart, ui } from "./store";

/** Adds to the bag and gives the customer feedback in Persian. */
export function addToBag(productId: string, opts: { color?: string; size?: string; qty?: number } = {}) {
  const p = getProduct(productId);
  if (!p) return;
  const { added } = cart.add({
    productId,
    color: opts.color ?? p.colors[0],
    size: opts.size,
    qty: opts.qty ?? 1,
  });
  if (added <= 0) {
    toast.warning("موجودی این کالا در سبد شما تکمیل است", {
      description: `از «${p.name}» بیش از این تعداد در انبار نداریم.`,
    });
    return;
  }
  toast.success(`«${p.name}» به سبد خرید افزوده شد`, {
    action: { label: "مشاهده سبد", onClick: () => ui.set({ cartOpen: true }) },
  });
}
