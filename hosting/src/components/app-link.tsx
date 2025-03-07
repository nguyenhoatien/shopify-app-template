import { Link, LinkProps, useLocation } from 'react-router';

type MergeParamsStrategyType = 'preferTo' | 'merge';

interface AppLinkProps extends LinkProps {
    mergeParamsStrategy?: MergeParamsStrategyType;
}

export default function AppLink({ to, mergeParamsStrategy = 'preferTo', ...rest }: AppLinkProps) {
  const location = useLocation();
  const currentSearchParams = new URLSearchParams(location.search);

  let targetTo = to;

  if (typeof to === 'string') {
    if (!to.includes('?')) {
      targetTo = `${to}${currentSearchParams.toString() ? `?${currentSearchParams.toString()}` : ''}`;
    } else {
      if (mergeParamsStrategy === 'merge') {
        const [pathnamePart, searchPart] = to.split('?');
        const toSearchParams = new URLSearchParams(searchPart);
        const mergedSearchParams = new URLSearchParams();

        for (const [key, value] of toSearchParams.entries()) {
          mergedSearchParams.set(key, value);
        }
        for (const [key, value] of currentSearchParams.entries()) {
          if (!mergedSearchParams.has(key)) {
            mergedSearchParams.set(key, value);
          }
        }
        targetTo = `${pathnamePart}?${mergedSearchParams.toString()}`;
      }
    }
  } else if (typeof to === 'object') {
    const targetSearchString = to.search || '';
    const toSearchParams = new URLSearchParams(targetSearchString);
    const mergedSearchParams = new URLSearchParams();

    if (mergeParamsStrategy === 'merge') {
      for (const [key, value] of toSearchParams.entries()) {
        mergedSearchParams.set(key, value);
      }
      for (const [key, value] of currentSearchParams.entries()) {
        if (!mergedSearchParams.has(key)) {
          mergedSearchParams.set(key, value);
        }
      }
    } else {
      for (const [key, value] of toSearchParams.entries()) {
        mergedSearchParams.set(key, value);
      }
    }

    targetTo = {
      ...to,
      search: mergedSearchParams.toString() ? `?${mergedSearchParams.toString()}` : undefined, // Loại bỏ 'search' nếu không có params nào
    };
  }

  return <Link to={targetTo} {...rest} />;
}

