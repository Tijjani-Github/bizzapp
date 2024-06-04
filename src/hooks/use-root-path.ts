import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

export default function useRootPath(level = 1) {
  const pathname = usePathname();
  const params = useParams();

  const rootPath = useMemo(() => {
    if (params.slug?.length) {
      const paths = pathname.split("/");
      paths.splice(level * -1);

      return paths.join("/");
    }
    return pathname;
  }, [level, params, pathname]);

  return rootPath;
}
