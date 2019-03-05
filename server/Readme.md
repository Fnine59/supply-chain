# 后端相关配置

## 数据库删表语句

```sql
DROP TABLE baseinfo_goods;/*SQL@Run*//*SkipError*/
DROP TABLE baseinfo_store;/*SQL@Run*//*SkipError*/
DROP TABLE baseinfo_dispatch;/*SQL@Run*//*SkipError*/
DROP TABLE baseinfo_supplier;/*SQL@Run*//*SkipError*/
DROP TABLE baseinfo_user;/*SQL@Run*//*SkipError*/
DROP TABLE util_order_no;/*SQL@Run*//*SkipError*/
DROP TABLE store_purchase_order;/*SQL@Run*//*SkipError*/
DROP TABLE store_acceptance_order;/*SQL@Run*//*SkipError*/
DROP TABLE store_self_purchase_order;/*SQL@Run*//*SkipError*/
DROP TABLE store_self_acceptance_order;/*SQL@Run*//*SkipError*/
DROP TABLE relations_delivery_goods;/*SQL@Run*//*SkipError*/
DROP TABLE relations_purchase_goods;/*SQL@Run*//*SkipError*/
DROP TABLE relations_acceptance_goods;/*SQL@Run*//*SkipError*/
DROP TABLE store_in_depot;/*SQL@Run*//*SkipError*/
DROP TABLE store_depots;/*SQL@Run*//*SkipError*/
DROP TABLE hq_order;/*SQL@Run*//*SkipError*/
DROP TABLE supplier_order;/*SQL@Run*//*SkipError*/
```

## 数据库建表语句

```sql
CREATE TABLE baseinfo_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '物品id' ,
    unit VARCHAR(128)    COMMENT '单位名称' ,
    name VARCHAR(3072) NOT NULL   COMMENT '物品名称' ,
    unit_price DECIMAL(32,8) NOT NULL   COMMENT '物品单价' ,
    status VARCHAR(1)    COMMENT '启用状态 true->已启用;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '物品表';/*SQL@Run*/
ALTER TABLE baseinfo_goods COMMENT '物品表';/*SQL@Run*/
CREATE TABLE baseinfo_store(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '门店id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '门店名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '门店状态 true->已启用;false->已停用' ,
    address VARCHAR(32) NOT NULL   COMMENT '门店地址' ,
    PRIMARY KEY (id)
) COMMENT = '门店信息表 ';/*SQL@Run*/
ALTER TABLE baseinfo_store COMMENT '门店信息表';/*SQL@Run*/
CREATE TABLE baseinfo_dispatch(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '配送中心id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '配送中心名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '使用状态 true->使用中;false->已停用' ,
    address VARCHAR(32) NOT NULL   COMMENT '配送中心地址' ,
    PRIMARY KEY (id)
) COMMENT = '配送中心（总部）表 ';/*SQL@Run*/
ALTER TABLE baseinfo_dispatch COMMENT '配送中心（总部）表';/*SQL@Run*/
CREATE TABLE baseinfo_supplier(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '供应商名称' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '经营类型 1->公司;2->个人' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '启用状态 true->已启用;false->已停用' ,
    address VARCHAR(32) NOT NULL   COMMENT '供应商地址' ,
    PRIMARY KEY (id)
) COMMENT = '供应商表 ';/*SQL@Run*/
ALTER TABLE baseinfo_supplier COMMENT '供应商表';/*SQL@Run*/
CREATE TABLE baseinfo_user(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    user_name VARCHAR(1024) NOT NULL   COMMENT '用户名 登录用用户名（手机号）' ,
    password VARCHAR(1024) NOT NULL   COMMENT '密码' ,
    nickname VARCHAR(1024)    COMMENT '昵称 显示用用户名' ,
    PRIMARY KEY (id)
) COMMENT = '用户表 ';/*SQL@Run*/
ALTER TABLE baseinfo_user COMMENT '用户表';/*SQL@Run*/
CREATE TABLE util_order_no(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    number BIGINT NOT NULL   COMMENT '流水号' ,
    date DATE NOT NULL   COMMENT '流水日期' ,
    type VARCHAR(128) NOT NULL   COMMENT '流水号用途 pr->请购单流水号；ps->总部订单号；sf->门店自采单；fh->供应商发货单；prys->门店请购验收单；sfys->门店自采验收单；' ,
    PRIMARY KEY (id)
) COMMENT = '流水号 ';/*SQL@Run*/
ALTER TABLE util_order_no COMMENT '流水号';/*SQL@Run*/
CREATE TABLE store_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '请购单号' ,
    create_time DATETIME NOT NULL   COMMENT '请购日期 创建此采购单的时间' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成;4->已作废' ,
    amount DECIMAL(32,8) NOT NULL   COMMENT '请购金额 单据总金额' ,
    store_id INT NOT NULL   COMMENT '门店id 关联的门店id' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id 请购的配送中心id' ,
    PRIMARY KEY (id)
) COMMENT = '门店请购订单表 ';/*SQL@Run*/
ALTER TABLE store_purchase_order COMMENT '门店请购订单表';/*SQL@Run*/
CREATE TABLE store_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    dispatch_order_no VARCHAR(32) NOT NULL   COMMENT '来源配送单号 关联的来源单号' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '验收单号' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    update_time DATETIME NOT NULL   COMMENT '单据状态更新时间' ,
    status VARCHAR(128) NOT NULL   COMMENT '单据状态' ,
    purchase_amount DECIMAL(32,8) NOT NULL   COMMENT '采购总金额 配送单的差异金额+配送金额得出，即门店采购时的总金额' ,
    delivery_diff_amount DECIMAL(32,8)    COMMENT '总部差异金额 总部配送差异金额' ,
    accept_amount DECIMAL(32,8) NOT NULL  DEFAULT 0 COMMENT '验收总金额 采购金额-配送差异金额-验收时差异金额=验收金额' ,
    diff_amount DECIMAL(32,8) NOT NULL  DEFAULT 0 COMMENT '验收时差异金额 总部配送差异+运输过程丢失差异' ,
    PRIMARY KEY (id)
) COMMENT = '门店请购验收单表 ';/*SQL@Run*/
ALTER TABLE store_acceptance_order COMMENT '门店请购验收单表';/*SQL@Run*/
CREATE TABLE store_self_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '自采单号' ,
    create_time DATETIME NOT NULL   COMMENT '自采日期 创建此采购单的时间' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理；2->已提交；3->已完成；4->已作废' ,
    amount DECIMAL(32,8) NOT NULL   COMMENT '自采金额 单据总金额' ,
    store_id INT    COMMENT '门店id 关联的门店id' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    supply_id INT NOT NULL   COMMENT '关联供应商id' ,
    PRIMARY KEY (id)
) COMMENT = '门店自采订单表 ';/*SQL@Run*/
ALTER TABLE store_self_purchase_order COMMENT '门店自采订单表';/*SQL@Run*/
CREATE TABLE store_self_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    supplier_delivery_order_no VARCHAR(32) NOT NULL   COMMENT '来源供应商发货单号 关联的供应商发货单号' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '验收单号' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    update_time DATETIME NOT NULL   COMMENT '单据状态更新时间' ,
    status VARCHAR(128) NOT NULL   COMMENT '单据状态' ,
    amount DECIMAL(32,10)    COMMENT '验收总金额 门店验收的总金额' ,
    diff_amount DECIMAL(32,8)    COMMENT '验收总差异金额 门店验收自采单时的差异，该差异一定是运输途中丢失导致的差异' ,
    purchase_amount DECIMAL(32,8)    COMMENT '采购总金额 门店自采的总金额' ,
    PRIMARY KEY (id)
) COMMENT = '门店自采验收单表 ';/*SQL@Run*/
ALTER TABLE store_self_acceptance_order COMMENT '门店自采验收单表';/*SQL@Run*/
CREATE TABLE relations_delivery_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    delivery_order_no VARCHAR(32) NOT NULL   COMMENT '配送单号' ,
    goods_id INT NOT NULL   COMMENT '物品id 配送的物品，在配送单创建时从采购关系中获取' ,
    count DECIMAL(32,10)   DEFAULT 0 COMMENT '配送数量 总部配送及发货的数量' ,
    goods_amount DECIMAL(32,8)   DEFAULT 0 COMMENT '配送金额 依据物品单价计算出的该配送数量下的配送金额' ,
    type VARCHAR(128)    COMMENT '配送来源 用于区别是供应商送货还是总部配送，即，区分是门店请购还是自采。pr、sf' ,
    diff_count DECIMAL(32,10)   DEFAULT 0 COMMENT '差异数量' ,
    diff_amt DECIMAL(32,8)   DEFAULT 0 COMMENT '差异金额' ,
    PRIMARY KEY (id)
) COMMENT = '总部/供应商物品配送关系表 ';/*SQL@Run*/
ALTER TABLE relations_delivery_goods COMMENT '总部/供应商物品配送关系表';/*SQL@Run*/
CREATE TABLE relations_purchase_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '采购单号 关联的采购单号' ,
    goods_id INT NOT NULL   COMMENT '物品id 关联的物品id' ,
    goods_count DECIMAL(32,10) NOT NULL   COMMENT '采购物品数量 采购该物品的数量' ,
    goods_amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '物品金额 依据物品单价及数量计算出的采购总金额' ,
    type VARCHAR(128) NOT NULL   COMMENT '门店采购类型 因为门店采购有两种情况，此字段用于区别数据，方便查询，pr->门店请购；sf->主动配送；' ,
    PRIMARY KEY (id)
) COMMENT = '门店物品采购关系表 ';/*SQL@Run*/
ALTER TABLE relations_purchase_goods COMMENT '门店物品采购关系表';/*SQL@Run*/
CREATE TABLE relations_acceptance_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    accept_order_no VARCHAR(32) NOT NULL   COMMENT '验收单号' ,
    type VARCHAR(128) NOT NULL   COMMENT '验收来源 pr->门店请购，即总部配送；sf->门店自采，即供应商发货' ,
    purchase_count VARCHAR(32) NOT NULL   COMMENT '门店采购数量 从配送关系单上拿到的具体采购数量，方便用户溯源' ,
    delivery_count DECIMAL(32,10) NOT NULL   COMMENT '总部/供应商物品配送数量 配送单上的配送数量，在配送单状态变更为已提交后获得' ,
    accept_count VARCHAR(32)   DEFAULT 0 COMMENT '验收数量 门店实际验收数量' ,
    accept_amt DECIMAL(32,8)   DEFAULT 0 COMMENT '验收金额 门店实际验收金额' ,
    dispatch_diff_count DECIMAL(32,10)    COMMENT '总部配送差异数量 配送关系单上取得的总部配送差异数量，只用于门店请购，因为只有总部配送允许在配送时产生差异' ,
    send_diff_count DECIMAL(32,10)   DEFAULT 0 COMMENT '运输过程差异数量 运输过程中的意外导致的差异数量；对于门店请购来说，该差异数量为总差异数量-总部配送差异数量；对于门店自采来说，该差异数量=总差异数量' ,
    dispatch_diff_amount DECIMAL(32,8)    COMMENT '总部配送差异金额 总部配送差异金额，后续等待总部退款/补发物资（总部主动配送情况出现）' ,
    send_diff_amount DECIMAL(32,8)   DEFAULT 0 COMMENT '运输过程差异金额 运输过程中产生的差异部分的具体金额，主要用于追责' ,
    PRIMARY KEY (id)
) COMMENT = '门店验收物品关系表 ';/*SQL@Run*/
ALTER TABLE relations_acceptance_goods COMMENT '门店验收物品关系表';/*SQL@Run*/
CREATE TABLE store_in_depot(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    accept_order_no VARCHAR(32) NOT NULL   COMMENT '来源验收单号' ,
    type VARCHAR(128) NOT NULL   COMMENT '入库类型 pr->请购验收；sf->自采验收' ,
    create_time DATETIME    COMMENT '入库时间 验收单提交并入库的时间' ,
    store_id INT NOT NULL   COMMENT '入库门店 发生入库的门店' ,
    PRIMARY KEY (id)
) COMMENT = '入库记录表 记录产生物品入库数量的验收单信息';/*SQL@Run*/
ALTER TABLE store_in_depot COMMENT '入库记录表';/*SQL@Run*/
CREATE TABLE store_depots(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    store_id INT NOT NULL   COMMENT '门店id' ,
    depot_count DECIMAL(32,10) NOT NULL  DEFAULT 0 COMMENT '在库数量' ,
    PRIMARY KEY (id)
) COMMENT = '门店库存表 记录门店物品库存信息的表';/*SQL@Run*/
ALTER TABLE store_depots COMMENT '门店库存表';/*SQL@Run*/
CREATE TABLE hq_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    purchase_order_no VARCHAR(32) NOT NULL   COMMENT '请购单号 关联的门店请购单号，一定是请购类型' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id 负责送货的配送中心id' ,
    store_id INT NOT NULL   COMMENT '门店id 请购的门店id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '配送单号 配送单单号' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已提交;3->已完成;4->已撤回;' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间 单据的创建时间，即请购单提交的时间' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 用户根据单据状态可以判断当前时间的含义' ,
    amount DECIMAL(32,8)   DEFAULT 0 COMMENT '配送总金额 总部配送物品的金额，依据配送关系表计算得出，并存储' ,
    diff_amount DECIMAL(32,8)   DEFAULT 0 COMMENT '差异总金额 总部少发物资部分的差异金额，最终会退款给门店' ,
    PRIMARY KEY (id)
) COMMENT = '总部配送订单表 ';/*SQL@Run*/
ALTER TABLE hq_order COMMENT '总部配送订单表';/*SQL@Run*/
CREATE TABLE supplier_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    self_purchase_order_no VARCHAR(32) NOT NULL   COMMENT '自采单号 关联的门店采购单id，一定是自采类型' ,
    supply_id INT NOT NULL   COMMENT '供应商id' ,
    store_id INT NOT NULL   COMMENT '自采门店id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '发货单号 供应商发货单号' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已提交;3->已完成' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间 单据的生成时间，即门店提交自采单的时间，具有此字段是因为该字段可以作为查询时的排序依据' ,
    update_time DATETIME NOT NULL   COMMENT '单据状态更新时间' ,
    amount DECIMAL(32,8)   DEFAULT 0 COMMENT '发货金额 供应商发货物资总金额' ,
    PRIMARY KEY (id)
) COMMENT = '供应商发货订单表 ';/*SQL@Run*/
ALTER TABLE supplier_order COMMENT '供应商发货订单表';/*SQL@Run*/
```

## 数据库必需sql

```sql
ALTER TABLE store_depots
ADD UNIQUE KEY(goods_id, store_id);
```