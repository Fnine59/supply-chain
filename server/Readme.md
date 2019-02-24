# 后端相关配置

## 数据库建表语句

```sql
CREATE TABLE baseinfo_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '物品id' ,
    unit_id INT    COMMENT '单位id 物品关联的单位id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '物品名称' ,
    spec VARCHAR(128) NOT NULL   COMMENT '物品规格' ,
    unit_price DECIMAL(32,8) NOT NULL   COMMENT '物品单价' ,
    delete_flag VARCHAR(1) NOT NULL  DEFAULT false COMMENT '是否删除 true -> 已删除; false -> 未删除' ,
    PRIMARY KEY (id)
) COMMENT = '物品表';/*SQL@Run*/
ALTER TABLE baseinfo_goods COMMENT '物品表';/*SQL@Run*/
CREATE TABLE baseinfo_unit(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '单位id' ,
    name VARCHAR(1024) NOT NULL   COMMENT '单位名称' ,
    PRIMARY KEY (id)
) COMMENT = '物品单位表 ';/*SQL@Run*/
ALTER TABLE baseinfo_unit COMMENT '物品单位表';/*SQL@Run*/
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
    address VARCHAR(32)    COMMENT '配送中心地址' ,
    PRIMARY KEY (id)
) COMMENT = '配送中心（总部）表 ';/*SQL@Run*/
ALTER TABLE baseinfo_dispatch COMMENT '配送中心（总部）表';/*SQL@Run*/
CREATE TABLE baseinfo_supplier(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '供应商名称' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '经营类型 1->公司;2->个人' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '启用状态 true->已启用;false->已停用' ,
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
CREATE TABLE store_goods_relations(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id INT NOT NULL   COMMENT '采购单id 关联的采购单的id' ,
    goods_id INT NOT NULL   COMMENT '物品id 关联的物品id' ,
    dispatch_id INT    COMMENT '送货机构id 关联的送货机构id，如果是自采则对应供应商id，如果是请购则对应总部id' ,
    goods_count DECIMAL(32,10) NOT NULL   COMMENT '采购物品数量 采购该物品的数量' ,
    PRIMARY KEY (id)
) COMMENT = '门店物品采购关系表 ';/*SQL@Run*/
ALTER TABLE store_goods_relations COMMENT '门店物品采购关系表';/*SQL@Run*/
CREATE TABLE store_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '请购单号' ,
    create_time DATETIME NOT NULL   COMMENT '请购日期 创建此采购单的时间' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成' ,
    amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '请购金额 依据单据的物品单价及数量计算出的采购总金额' ,
    store_id INT    COMMENT '门店id 关联的门店id' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    PRIMARY KEY (id)
) COMMENT = '门店请购订单表 ';/*SQL@Run*/
ALTER TABLE store_purchase_order COMMENT '门店请购订单表';/*SQL@Run*/
CREATE TABLE store_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    store_order_id INT    COMMENT '来源订单id 关联的门店采购单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    status VARCHAR(128) NOT NULL   COMMENT '单据状态' ,
    PRIMARY KEY (id)
) COMMENT = '门店请购验收单表 ';/*SQL@Run*/
ALTER TABLE store_acceptance_order COMMENT '门店请购验收单表';/*SQL@Run*/
CREATE TABLE store_depot(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    count BIGINT NOT NULL  DEFAULT 0 COMMENT '库存数量' ,
    accept_order_id INT NOT NULL   COMMENT '验收单id' ,
    accept_type VARCHAR(128)    COMMENT '验收类型 1->请购验收；2->自采验收' ,
    PRIMARY KEY (id)
) COMMENT = '门店库存表 ';/*SQL@Run*/
ALTER TABLE store_depot COMMENT '门店库存表';/*SQL@Run*/
CREATE TABLE store_self_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '自采单号' ,
    create_time DATETIME NOT NULL   COMMENT '自采日期 创建此采购单的时间' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成' ,
    amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '自采金额 依据单据的物品单价及数量计算出的采购总金额' ,
    store_id INT    COMMENT '门店id 关联的门店id' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    PRIMARY KEY (id)
) COMMENT = '门店自采订单表 ';/*SQL@Run*/
ALTER TABLE store_self_purchase_order COMMENT '门店自采订单表';/*SQL@Run*/
CREATE TABLE store_self_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    store_order_id INT    COMMENT '来源订单id 关联的门店采购单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    status VARCHAR(128) NOT NULL   COMMENT '单据状态' ,
    PRIMARY KEY (id)
) COMMENT = '门店自采验收单表 ';/*SQL@Run*/
ALTER TABLE store_self_acceptance_order COMMENT '门店自采验收单表';/*SQL@Run*/
CREATE TABLE hq_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    purchase_order_no VARCHAR(32) NOT NULL   COMMENT '请购单id 关联的门店采购单id，一定是请购类型' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已提交;3->已完成' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id' ,
    PRIMARY KEY (id)
) COMMENT = '总部配送订单表 ';/*SQL@Run*/
ALTER TABLE hq_order COMMENT '总部配送订单表';/*SQL@Run*/
CREATE TABLE supplier_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    self_purchase_order_no VARCHAR(32) NOT NULL   COMMENT '自采单id 关联的门店采购单id，一定是自采类型' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已提交;3->已完成' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    supply_id INT NOT NULL   COMMENT '供应商id' ,
    PRIMARY KEY (id)
) COMMENT = '供应商发货订单表 ';/*SQL@Run*/
ALTER TABLE supplier_order COMMENT '供应商发货订单表';/*SQL@Run*/
```

## 数据库重新建表语句（带有删表语句）

```sql
DROP TABLE baseinfo_goods;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '物品id' ,
    unit_id INT    COMMENT '单位id 物品关联的单位id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '物品名称' ,
    spec VARCHAR(128) NOT NULL   COMMENT '物品规格' ,
    unit_price DECIMAL(32,8) NOT NULL   COMMENT '物品单价' ,
    delete_flag VARCHAR(1) NOT NULL  DEFAULT false COMMENT '是否删除 true -> 已删除; false -> 未删除' ,
    PRIMARY KEY (id)
) COMMENT = '物品表';/*SQL@Run*/
ALTER TABLE baseinfo_goods COMMENT '物品表';/*SQL@Run*/
DROP TABLE baseinfo_unit;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_unit(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '单位id' ,
    name VARCHAR(1024) NOT NULL   COMMENT '单位名称' ,
    PRIMARY KEY (id)
) COMMENT = '物品单位表 ';/*SQL@Run*/
ALTER TABLE baseinfo_unit COMMENT '物品单位表';/*SQL@Run*/
DROP TABLE baseinfo_store;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_store(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '门店id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '门店名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '门店状态 true->已启用;false->已停用' ,
    address VARCHAR(32) NOT NULL   COMMENT '门店地址' ,
    PRIMARY KEY (id)
) COMMENT = '门店信息表 ';/*SQL@Run*/
ALTER TABLE baseinfo_store COMMENT '门店信息表';/*SQL@Run*/
DROP TABLE baseinfo_dispatch;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_dispatch(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '配送中心id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '配送中心名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '使用状态 true->使用中;false->已停用' ,
    address VARCHAR(32)    COMMENT '配送中心地址' ,
    PRIMARY KEY (id)
) COMMENT = '配送中心（总部）表 ';/*SQL@Run*/
ALTER TABLE baseinfo_dispatch COMMENT '配送中心（总部）表';/*SQL@Run*/
DROP TABLE baseinfo_supplier;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_supplier(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '供应商名称' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '经营类型 1->公司;2->个人' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '启用状态 true->已启用;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '供应商表 ';/*SQL@Run*/
ALTER TABLE baseinfo_supplier COMMENT '供应商表';/*SQL@Run*/
DROP TABLE baseinfo_user;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_user(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    user_name VARCHAR(1024) NOT NULL   COMMENT '用户名 登录用用户名（手机号）' ,
    password VARCHAR(1024) NOT NULL   COMMENT '密码' ,
    nickname VARCHAR(1024)    COMMENT '昵称 显示用用户名' ,
    PRIMARY KEY (id)
) COMMENT = '用户表 ';/*SQL@Run*/
ALTER TABLE baseinfo_user COMMENT '用户表';/*SQL@Run*/
DROP TABLE store_goods_relations;/*SQL@Run*//*SkipError*/
CREATE TABLE store_goods_relations(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id INT NOT NULL   COMMENT '采购单id 关联的采购单的id' ,
    goods_id INT NOT NULL   COMMENT '物品id 关联的物品id' ,
    dispatch_id INT    COMMENT '送货机构id 关联的送货机构id，如果是自采则对应供应商id，如果是请购则对应总部id' ,
    goods_count DECIMAL(32,10) NOT NULL   COMMENT '采购物品数量 采购该物品的数量' ,
    PRIMARY KEY (id)
) COMMENT = '门店物品采购关系表 ';/*SQL@Run*/
ALTER TABLE store_goods_relations COMMENT '门店物品采购关系表';/*SQL@Run*/
DROP TABLE store_purchase_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '请购单号' ,
    create_time DATETIME NOT NULL   COMMENT '请购日期 创建此采购单的时间' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成' ,
    amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '请购金额 依据单据的物品单价及数量计算出的采购总金额' ,
    store_id INT    COMMENT '门店id 关联的门店id' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    PRIMARY KEY (id)
) COMMENT = '门店请购订单表 ';/*SQL@Run*/
ALTER TABLE store_purchase_order COMMENT '门店请购订单表';/*SQL@Run*/
DROP TABLE store_acceptance_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    store_order_id INT    COMMENT '来源订单id 关联的门店采购单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    status VARCHAR(128) NOT NULL   COMMENT '单据状态' ,
    PRIMARY KEY (id)
) COMMENT = '门店请购验收单表 ';/*SQL@Run*/
ALTER TABLE store_acceptance_order COMMENT '门店请购验收单表';/*SQL@Run*/
DROP TABLE store_depot;/*SQL@Run*//*SkipError*/
CREATE TABLE store_depot(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    count BIGINT NOT NULL  DEFAULT 0 COMMENT '库存数量' ,
    accept_order_id INT NOT NULL   COMMENT '验收单id' ,
    accept_type VARCHAR(128)    COMMENT '验收类型 1->请购验收；2->自采验收' ,
    PRIMARY KEY (id)
) COMMENT = '门店库存表 ';/*SQL@Run*/
ALTER TABLE store_depot COMMENT '门店库存表';/*SQL@Run*/
DROP TABLE store_self_purchase_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_self_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '自采单号' ,
    create_time DATETIME NOT NULL   COMMENT '自采日期 创建此采购单的时间' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成' ,
    amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '自采金额 依据单据的物品单价及数量计算出的采购总金额' ,
    store_id INT    COMMENT '门店id 关联的门店id' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    PRIMARY KEY (id)
) COMMENT = '门店自采订单表 ';/*SQL@Run*/
ALTER TABLE store_self_purchase_order COMMENT '门店自采订单表';/*SQL@Run*/
DROP TABLE store_self_acceptance_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_self_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    store_order_id INT    COMMENT '来源订单id 关联的门店采购单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    status VARCHAR(128) NOT NULL   COMMENT '单据状态' ,
    PRIMARY KEY (id)
) COMMENT = '门店自采验收单表 ';/*SQL@Run*/
ALTER TABLE store_self_acceptance_order COMMENT '门店自采验收单表';/*SQL@Run*/
DROP TABLE hq_order;/*SQL@Run*//*SkipError*/
CREATE TABLE hq_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    purchase_order_no VARCHAR(32) NOT NULL   COMMENT '请购单id 关联的门店采购单id，一定是请购类型' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已提交;3->已完成' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id' ,
    PRIMARY KEY (id)
) COMMENT = '总部配送订单表 ';/*SQL@Run*/
ALTER TABLE hq_order COMMENT '总部配送订单表';/*SQL@Run*/
DROP TABLE supplier_order;/*SQL@Run*//*SkipError*/
CREATE TABLE supplier_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    self_purchase_order_no VARCHAR(32) NOT NULL   COMMENT '自采单id 关联的门店采购单id，一定是自采类型' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已提交;3->已完成' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    supply_id INT NOT NULL   COMMENT '供应商id' ,
    PRIMARY KEY (id)
) COMMENT = '供应商发货订单表 ';/*SQL@Run*/
ALTER TABLE supplier_order COMMENT '供应商发货订单表';/*SQL@Run*/
```