
import { isProduction } from "./api/deploy";


class BaseService {
    protected adjustUrlForProduction(url: string | undefined): string | undefined {
        if (isProduction && url) {
            return "https" + url?.substring(4);
        }
        return url;
    }

}

export default BaseService;