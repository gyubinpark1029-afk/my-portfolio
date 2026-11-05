// 배포 주소(https://사용자명.github.io/저장소명/)에서 GitHub 저장소 주소를 만든다.
// 별도 컬럼 없이 detail_url 하나만으로 해결하기 위한 방법이다.
export default function getGithubUrl(detailUrl) {
  try {
    const { hostname, pathname } = new URL(detailUrl);
    if (!hostname.endsWith('.github.io')) return null;
    const owner = hostname.replace('.github.io', '');
    const repo = pathname.split('/').filter(Boolean)[0];
    return repo ? `https://github.com/${owner}/${repo}` : null;
  } catch {
    return null;
  }
}
