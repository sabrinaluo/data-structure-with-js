/*

 如果一个关键字可以表示成字符的序号，即字符串，那么可以用键树（keyword tree），又称数字搜索树（digital search tree）或字符树，也叫字典树，来表示这样的字符串的集合。

 概念

 如果一个关键字可以表示成字符的序号，即字符串，那么可以用键树（keyword tree），又称数字搜索树（digital search tree）或字符树，来表示这样的字符串的集合。键树又称为数字查找树（Digital Search Tree)或Trie树(trie为retrieve中间4个字符)，其结构受启发于一部大型字典的“书边标目”。字典中标出首字母是 A,B,C,....Z的单词所在页,再对各部分标出第二字母为A,B,C,...Z的单词所在的页, ....等等。

 键树是一种特殊的查找树，它的某个节点不是包含一个或多个关键字，而是只包含组成关键字的一部分（字符或数字），比如：如果关键字是数值，则节点中只包含一个数位；如果关键字是单词，则节点中只包含一个字母字符。

 根结点不代表任何字符，根以下第一层的结点对应于字符串的第一个字符，第二层的结点对应于字符串的第二个字符……每个字符串可由一个特殊的字符如“$”等作为字符串的结束符，用一个叶子结点来表示该特殊字符。把从根到叶子的路径上，所有结点（除根以外）对应的字符连接起来，就得到一个字符串。因此，每个叶子结点对应一个关键字。在叶子结点还可以包含一个指针，指向该关键字所对应的元素。整个字符串集合中的字符串的数目等于叶子结点的数目。如果一个集合中的关键字都具有这样的字符串特性，那么，该关键字集合就可采用这样一棵键树来表示。事实上，还可以赋予“字符串”更广泛的含义，它可以是任何类型的对象组成的串。


 键树的存储
 1）双链树表示
 2) 多重链表表示


 键树的应用场景

 Trie是一种非常简单高效的数据结构，但有大量的应用实例。
 （1） 字符串检索
 事先将已知的一些字符串（字典）的有关信息保存到trie树里，查找另外一些未知字符串是否出现过或者出现频率。
 举例：
 @  给出N 个单词组成的熟词表，以及一篇全用小写英文书写的文章，请你按最早出现的顺序写出所有不在熟词表中的生词。
 @  给出一个词典，其中的单词为不良单词。单词均为小写字母。再给出一段文本，文本的每一行也由小写字母构成。判断文本中是否含有任何不良单词。例如，若rob是不良单词，那么文本problem含有不良单词。

 （2）字符串最长公共前缀
 Trie树利用多个字符串的公共前缀来节省存储空间，反之，当我们把大量字符串存储到一棵trie树上时，我们可以快速得到某些字符串的公共前缀。
 举例：
 @ 给出N 个小写英文字母串，以及Q 个询问，即询问某两个串的最长公共前缀的长度是多少？
 解决方案：首先对所有的串建立其对应的字母树。此时发现，对于两个串的最长公共前缀的长度即它们所在结点的公共祖先个数，于是，问题就转化为了离线（Offline）的最近公共祖先（Least Common Ancestor，简称LCA）问题。
 而最近公共祖先问题同样是一个经典问题，可以用下面几种方法：
 1. 利用并查集（Disjoint Set），可以采用采用经典的Tarjan 算法；
 2. 求出字母树的欧拉序列（Euler Sequence ）后，就可以转为经典的最小值查询（Range Minimum Query，简称RMQ）问题了；
 （关于并查集，Tarjan算法，RMQ问题，网上有很多资料。）

 （3）排序
 Trie树是一棵多叉树，只要先序遍历整棵树，输出相应的字符串便是按字典序排序的结果。
 举例：
 @ 给你N 个互不相同的仅由一个单词构成的英文名，让你将它们按字典序从小到大排序输出。

 （4） 作为其他数据结构和算法的辅助结构
 如后缀树，AC自动机等
 */


/*
 双链树表示

 以树的孩子兄弟链表来表示键树，则每个分支结点包括三个域：
 symbol域：存储关键字的一个字符；
 first域：存储指向第一棵子树根的指针；
 next域：存储指向右兄弟的指针。

 同时，叶子结点不含first域，它的infoptr域存储指向该关键字记录的指针。
 此时的键树又称双链树。
 在双链树中插入或删除一个关键字，相当于在树中某个结点上插入或删除一棵子树。
 结点的结构中可以设置一个枚举变量表示结点的类型，叶子结点和分支结点。
 叶子结点和分支结点都有symbol域和next域。不同的一个域可以用联合表示，叶子结点包含infoptr指向记录，而分支结点是first域指向其第一棵子树。


 双链树的查找

 假设给定值为K.ch(0..num-1), 其中K.ch[0]至 K.ch[num-2]表示待查关键字中num-1个字符， K.ch[num-1]为结束符$。
 从双链树的根指针出发，顺first指针找到第一棵子树的根结点，以K.ch[0]和此结点的symbol域比较，若相等，则顺first域再比较下一字符，否则沿next域顺序查找。
 若直至空仍比较不等，则查找不成功。

 // 相关资料
 http://www.cnblogs.com/rollenholt/archive/2012/04/24/2468932.html
 http://blog.csdn.net/v_july_v/article/details/6897097
 http://www.raychase.net/1783
 */