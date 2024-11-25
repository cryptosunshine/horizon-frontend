// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
    function transfer(address to, uint256 value) external returns (bool);
}

contract StakingContract {
    // Conflux平均3秒一个区块
    // 最小锁定期：1周 = 7 * 24 * 3600 / 3 ≈ 201600个区块
    // 最大锁定期：4年 = 4 * 365 * 24 * 3600 / 3 ≈ 42048000个区块
    uint256 public constant MIN_LOCK_BLOCKS = 201600; // 约1周
    uint256 public constant MAX_LOCK_BLOCKS = 42048000; // 约4年
    uint256 public constant MAX_STAKE_AMOUNT = 1000000 * 1e18; // 最大质押金额

    IERC20 public immutable token;

    struct StakeInfo {
        uint256 amount; // 质押数量
        uint256 endBlock; // 解锁区块
        uint256 shares; // 份额
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public totalShares;

    event Staked(
        address indexed user,
        uint256 amount,
        uint256 shares,
        uint256 endBlock
    );
    event Withdrawn(address indexed user, uint256 amount, uint256 shares);

    constructor(address _token) {
        token = IERC20(_token);
    }

    // 计算份额：质押金额 * 锁定区块数 / 最小锁定区块数
    function calculateShares(
        uint256 amount,
        uint256 lockBlocks
    ) public pure returns (uint256) {
        return (amount * lockBlocks) / MIN_LOCK_BLOCKS;
    }

    // 质押代币
    function stake(uint256 amount, uint256 lockBlocks) external {
        require(amount > 0, "Amount must be greater than 0");
        require(amount > 0 && amount <= MAX_STAKE_AMOUNT, "Invalid amount");
        require(
            lockBlocks >= MIN_LOCK_BLOCKS && lockBlocks <= MAX_LOCK_BLOCKS,
            "Invalid lock period"
        );

        StakeInfo storage userStake = stakes[msg.sender];
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        uint256 newShares = calculateShares(amount, lockBlocks);

        // 如果是新质押
        if (userStake.amount == 0) {
            userStake.endBlock = block.number + lockBlocks;
            userStake.amount = amount;
            userStake.shares = newShares;
            totalShares += newShares;
        }
        // 如果是追加质押
        else {
            require(
                block.number < userStake.endBlock,
                "Original stake expired"
            );
            uint256 remainingBlocks = userStake.endBlock - block.number;
            uint256 additionalShares = calculateShares(amount, remainingBlocks);
            userStake.amount += amount;
            userStake.shares += additionalShares;
            totalShares += additionalShares;
        }

        totalShares += newShares;

        emit Staked(msg.sender, amount, newShares, userStake.endBlock);
    }

    // 提取质押
    function withdraw() external {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");
        require(block.number >= userStake.endBlock, "Still locked");

        uint256 amount = userStake.amount;
        uint256 shares = userStake.shares;

        // 先更新状态
        totalShares -= shares;
        delete stakes[msg.sender];

        // 最后进行转账
        require(token.transfer(msg.sender, amount), "Transfer failed");

        emit Withdrawn(msg.sender, amount, shares);
    }

    // 查询质押信息
    function getStakeInfo(
        address user
    )
        external
        view
        returns (
            uint256 amount,
            uint256 endBlock,
            uint256 shares,
            uint256 remainingBlocks
        )
    {
        StakeInfo memory userStake = stakes[user];
        amount = userStake.amount;
        endBlock = userStake.endBlock;
        shares = userStake.shares;

        if (block.number < userStake.endBlock) {
            remainingBlocks = userStake.endBlock - block.number;
        }
    }
}
