import { Toast } from "vant";
import config from "@/api/config";
const tip = {
    state: {
        loading: "",
        loadingState: false,
        timer: "" // 定时器
    },
    actions: {
        showLoading({ state }) {
            if (state.loadingState) return;
            state.loadingState = true;
            state.loading = Toast.loading({
                mask: false,
                forbidClick: true,
                message: "加载中...",
                duration: config.timeout
            });
            state.timer = setTimeout(() => {
                state.loading.clear();
                Toast({
                    message: "请求超时",
                    position: "bottom"
                });
            }, config.timeout);
        },
        hideLoading({ state }) {
            clearTimeout(state.timer);
            state.loadingState = false;
            if (state.loading) state.loading.clear();
        }
    }
};

export default tip;