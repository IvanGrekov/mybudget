import IconWrapper from 'components/icons/IconWrapper';
import { IIconProps } from 'components/icons/types/iconProps';

export default function BeautyIcon({
    size,
    color,
    className,
    wrapperClassName,
}: IIconProps): JSX.Element {
    return (
        <IconWrapper size={size} className={wrapperClassName}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 512 512"
                version="1.1"
                xmlSpace="preserve"
                fillRule="evenodd"
                clipRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                className={className}
                style={{ fill: color }}
            >
                <g transform="matrix(1,0,0,1,-1686,-562)">
                    <g id="Icons">
                        <path d="M1770.15,843.998L1770.15,859.76C1770.15,868.07 1776.89,874.817 1785.2,874.817L1788.94,874.817L1788.94,1037.52C1788.94,1051.58 1800.36,1063 1814.43,1063C1828.5,1063 1839.91,1051.58 1839.91,1037.52L1839.91,874.817L1843.66,874.817C1851.97,874.817 1858.71,868.07 1858.71,859.76L1858.71,843.998C1891.91,827.626 1914.76,793.44 1914.76,753.958C1914.76,753.958 1914.76,673.331 1914.76,673.331C1914.76,617.957 1869.81,573 1814.43,573C1759.06,573 1714.1,617.957 1714.1,673.331C1714.1,673.331 1714.1,753.958 1714.1,753.958C1714.1,793.44 1736.95,827.626 1770.15,843.998ZM1829.91,874.817L1798.94,874.817L1798.94,1037.52C1798.94,1046.06 1805.88,1053 1814.43,1053C1822.98,1053 1829.91,1046.06 1829.91,1037.52L1829.91,874.817ZM2029.38,863.58C2030.94,867.388 2033.38,870.747 2036.44,873.409L2017.7,905.876C1999.52,898.227 1978.04,905.126 1967.93,922.643C1956.97,941.626 1963.48,965.937 1982.47,976.897C2001.45,987.857 2025.76,981.343 2036.72,962.36C2046.83,944.843 2042.07,922.792 2026.36,910.876L2045.1,878.417C2047.78,879.341 2050.65,879.843 2053.64,879.843C2056.57,879.843 2059.39,879.361 2062.03,878.472L2080.74,910.876C2065.02,922.792 2060.26,944.843 2070.37,962.36C2081.33,981.343 2105.64,987.857 2124.63,976.897C2143.61,965.937 2150.12,941.626 2139.16,922.643C2129.05,905.126 2107.57,898.227 2089.4,905.876L2070.72,873.519C2074.1,870.609 2076.74,866.848 2078.3,862.57L2169.23,705.069C2170.09,703.588 2170.12,701.774 2169.34,700.258L2146.51,656.47C2145.67,654.852 2144.01,653.822 2142.19,653.783C2140.36,653.743 2138.66,654.701 2137.75,656.282L2053.55,802.124L1969.34,656.282C1968.43,654.701 1966.73,653.743 1964.91,653.783C1963.08,653.822 1961.42,654.852 1960.58,656.47L1937.76,700.258C1936.97,701.774 1937.01,703.588 1937.86,705.069L2029.38,863.58ZM2017.18,916.765C2031.39,924.966 2036.26,943.156 2028.06,957.36C2019.86,971.563 2001.67,976.437 1987.47,968.237C1973.26,960.036 1968.39,941.846 1976.59,927.643C1984.79,913.439 2002.98,908.565 2017.18,916.765L2017.18,916.765ZM2089.91,916.765C2104.11,908.565 2122.3,913.439 2130.5,927.643C2138.7,941.846 2133.83,960.036 2119.63,968.237C2105.42,976.437 2087.23,971.563 2079.03,957.36C2070.83,943.156 2075.7,924.966 2089.91,916.765ZM2115.3,924.255C2105.23,918.44 2092.34,921.896 2086.52,931.966C2080.71,942.037 2084.16,954.933 2094.23,960.747C2104.3,966.562 2117.2,963.106 2123.01,953.036C2128.83,942.965 2125.37,930.069 2115.3,924.255ZM2012.86,924.255C2002.79,918.44 1989.89,921.896 1984.08,931.966C1978.26,942.037 1981.72,954.933 1991.79,960.747C2001.86,966.562 2014.76,963.106 2020.57,953.036C2026.38,942.965 2022.93,930.069 2012.86,924.255L2012.86,924.255ZM2110.3,932.915C2115.59,935.969 2117.41,942.745 2114.35,948.036C2111.3,953.326 2104.52,955.142 2099.23,952.087C2093.94,949.033 2092.13,942.257 2095.18,936.966C2098.24,931.676 2105.01,929.86 2110.3,932.915ZM2007.86,932.915C2013.15,935.97 2014.97,942.745 2011.91,948.036C2008.86,953.326 2002.08,955.142 1996.79,952.087C1991.5,949.033 1989.68,942.257 1992.74,936.966C1995.79,931.676 2002.57,929.86 2007.86,932.915L2007.86,932.915ZM2041.33,843.049C2038.89,845.889 2037.42,849.582 2037.42,853.616C2037.42,862.572 2044.69,869.843 2053.64,869.843C2062.6,869.843 2069.87,862.572 2069.87,853.616C2069.87,844.661 2062.6,837.39 2053.64,837.39C2048.8,837.39 2044.45,839.516 2041.48,842.883C2041.43,842.94 2041.38,842.995 2041.33,843.049ZM1848.71,848.27C1838.02,852.164 1826.47,854.289 1814.43,854.289C1802.39,854.289 1790.85,852.164 1780.15,848.27L1780.15,859.76C1780.15,862.551 1782.41,864.817 1785.2,864.817L1843.66,864.817C1846.45,864.817 1848.71,862.551 1848.71,859.76L1848.71,848.27ZM1904.76,673.331L1904.76,753.958C1904.76,803.813 1864.29,844.289 1814.43,844.289C1764.58,844.289 1724.1,803.813 1724.1,753.958L1724.1,673.331C1724.1,623.476 1764.58,583 1814.43,583C1864.29,583 1904.76,623.476 1904.76,673.331ZM2047.77,812.124L1965.24,669.169C1965.24,669.169 1947.89,702.446 1947.89,702.446L2029.39,843.61C2030.42,841.12 2031.83,838.822 2033.53,836.786L2047.77,812.124ZM2058.47,813.603C2058.24,814.427 2057.81,815.194 2057.19,815.817L2050.39,827.59C2051.45,827.458 2052.54,827.39 2053.64,827.39C2064.5,827.39 2073.82,834.002 2077.81,843.418L2159.2,702.446C2159.2,702.446 2141.85,669.169 2141.85,669.169L2058.47,813.603ZM1894.97,676.332C1894.97,631.882 1858.88,595.794 1814.43,595.794C1769.98,595.794 1733.89,631.882 1733.89,676.332L1733.89,750.957C1733.89,795.407 1769.98,831.495 1814.43,831.495C1858.88,831.495 1894.97,795.407 1894.97,750.957C1894.97,750.957 1894.97,676.332 1894.97,676.332ZM1884.97,676.332L1884.97,750.957C1884.97,789.888 1853.36,821.495 1814.43,821.495C1775.5,821.495 1743.89,789.888 1743.89,750.957C1743.89,750.957 1743.89,676.332 1743.89,676.332C1743.89,637.401 1775.5,605.794 1814.43,605.794C1853.36,605.794 1884.97,637.401 1884.97,676.332ZM1809.43,771.718L1809.43,782.702C1809.43,785.462 1811.67,787.702 1814.43,787.702C1817.19,787.702 1819.43,785.462 1819.43,782.702L1819.43,771.718C1819.43,768.958 1817.19,766.718 1814.43,766.718C1811.67,766.718 1809.43,768.958 1809.43,771.718ZM1770.15,771.718L1770.15,782.702C1770.15,785.462 1772.39,787.702 1775.15,787.702C1777.91,787.702 1780.15,785.462 1780.15,782.702L1780.15,771.718C1780.15,768.958 1777.91,766.718 1775.15,766.718C1772.39,766.718 1770.15,768.958 1770.15,771.718ZM1848.71,771.718L1848.71,782.702C1848.71,785.462 1850.95,787.702 1853.71,787.702C1856.47,787.702 1858.71,785.462 1858.71,782.702L1858.71,771.718C1858.71,768.958 1856.47,766.718 1853.71,766.718C1850.95,766.718 1848.71,768.958 1848.71,771.718ZM1848.71,729.306L1848.71,740.291C1848.71,743.05 1850.95,745.291 1853.71,745.291C1856.47,745.291 1858.71,743.05 1858.71,740.291L1858.71,729.306C1858.71,726.547 1856.47,724.306 1853.71,724.306C1850.95,724.306 1848.71,726.547 1848.71,729.306ZM1770.15,729.306L1770.15,740.291C1770.15,743.05 1772.39,745.291 1775.15,745.291C1777.91,745.291 1780.15,743.05 1780.15,740.291L1780.15,729.306C1780.15,726.547 1777.91,724.306 1775.15,724.306C1772.39,724.306 1770.15,726.547 1770.15,729.306ZM1809.43,729.306L1809.43,740.291C1809.43,743.05 1811.67,745.291 1814.43,745.291C1817.19,745.291 1819.43,743.05 1819.43,740.291L1819.43,729.306C1819.43,726.547 1817.19,724.306 1814.43,724.306C1811.67,724.306 1809.43,726.547 1809.43,729.306ZM1848.71,687.505L1848.71,698.489C1848.71,701.249 1850.95,703.489 1853.71,703.489C1856.47,703.489 1858.71,701.249 1858.71,698.489L1858.71,687.505C1858.71,684.746 1856.47,682.505 1853.71,682.505C1850.95,682.505 1848.71,684.746 1848.71,687.505ZM1770.15,687.505L1770.15,698.489C1770.15,701.249 1772.39,703.489 1775.15,703.489C1777.91,703.489 1780.15,701.249 1780.15,698.489L1780.15,687.505C1780.15,684.746 1777.91,682.505 1775.15,682.505C1772.39,682.505 1770.15,684.746 1770.15,687.505ZM1809.43,687.505L1809.43,698.489C1809.43,701.249 1811.67,703.489 1814.43,703.489C1817.19,703.489 1819.43,701.249 1819.43,698.489L1819.43,687.505C1819.43,684.746 1817.19,682.505 1814.43,682.505C1811.67,682.505 1809.43,684.746 1809.43,687.505ZM1848.71,647.84L1848.71,658.824C1848.71,661.583 1850.95,663.824 1853.71,663.824C1856.47,663.824 1858.71,661.583 1858.71,658.824L1858.71,647.84C1858.71,645.08 1856.47,642.84 1853.71,642.84C1850.95,642.84 1848.71,645.08 1848.71,647.84ZM1770.15,647.84L1770.15,658.824C1770.15,661.583 1772.39,663.824 1775.15,663.824C1777.91,663.824 1780.15,661.583 1780.15,658.824L1780.15,647.84C1780.15,645.08 1777.91,642.84 1775.15,642.84C1772.39,642.84 1770.15,645.08 1770.15,647.84ZM1809.43,647.84L1809.43,658.824C1809.43,661.583 1811.67,663.824 1814.43,663.824C1817.19,663.824 1819.43,661.583 1819.43,658.824L1819.43,647.84C1819.43,645.08 1817.19,642.84 1814.43,642.84C1811.67,642.84 1809.43,645.08 1809.43,647.84Z" />
                    </g>
                </g>
            </svg>
        </IconWrapper>
    );
}
