class Solution {
    public int maxProfit(int[] prices) {
        int right=1;
        int left=0;
        int max=0;
        int profit;
        int price=0;
        while (right<prices.length) {
            if (prices[right]>prices[left]){
                price=Math.max(prices[right],price);
                if (right+1<prices.length) {
                    if (prices[right+1]<prices[right]) {
                        max+=prices[right]-prices[left];
                        left=right;
                    }
                }
                else if (right+1==prices.length){
                   max+=prices[right]-prices[left]; 
                }
            }
            else {
                left=right;
            }
            right++;
        }
        return max;
    }
}
